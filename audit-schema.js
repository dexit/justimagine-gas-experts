#!/usr/bin/env node

/**
 * Schema.org Validation Audit
 * Validates JSON-LD schema markup on all key pages
 */

const fs = require('fs');
const path = require('path');

// Key pages to audit
const PAGES = [
  { url: '/', title: 'Homepage', expectedSchemas: ['LocalBusiness', 'OfferCatalog', 'BreadcrumbList', 'ItemList'] },
  { url: '/services', title: 'Services', expectedSchemas: ['Service', 'ItemList'] },
  { url: '/pricing', title: 'Pricing', expectedSchemas: ['Product', 'Offer'] },
  { url: '/contact', title: 'Contact', expectedSchemas: ['Organization', 'ContactPoint'] },
  { url: '/safety', title: 'Gas Safety', expectedSchemas: ['Service', 'AlertTriangle'] },
  { url: '/landlord', title: 'Landlord Services', expectedSchemas: ['Service', 'Product'] },
  { url: '/emergency', title: 'Emergency', expectedSchemas: ['EmergencyService', 'LocalBusiness'] },
  { url: '/areas', title: 'Areas', expectedSchemas: ['City', 'Place'] },
  { url: '/faq', title: 'FAQ', expectedSchemas: ['FAQPage', 'Question'] },
  { url: '/reviews', title: 'Reviews', expectedSchemas: ['Review', 'AggregateRating'] },
];

// Validation rules for each schema type
const VALIDATION_RULES = {
  LocalBusiness: {
    required: ['@context', '@type', 'name', 'telephone', 'email', 'address'],
    optional: ['logo', 'image', 'areaServed', 'openingHoursSpecification', 'hasOfferCatalog'],
  },
  OfferCatalog: {
    required: ['@type', 'name', 'itemListElement'],
    optional: ['description'],
  },
  BreadcrumbList: {
    required: ['@type', 'itemListElement'],
    optional: [],
  },
  Organization: {
    required: ['@context', '@type', 'name', 'url'],
    optional: ['logo', 'contactPoint', 'sameAs'],
  },
  Service: {
    required: ['@type', 'name', 'description', 'provider'],
    optional: ['areaServed', 'offers', 'aggregateRating'],
  },
  FAQPage: {
    required: ['@type', 'mainEntity'],
    optional: [],
  },
  Product: {
    required: ['@type', 'name', 'description', 'offers'],
    optional: ['image', 'brand', 'aggregateRating'],
  },
};

class SchemaAuditor {
  constructor() {
    this.results = [];
    this.summaryStats = {
      totalPages: 0,
      passedPages: 0,
      failedPages: 0,
      schemasFound: {},
      issuesFound: [],
    };
  }

  /**
   * Extract JSON-LD schemas from HTML
   */
  extractJsonLd(html) {
    const scripts = html.match(/<script type="application\/ld\+json"[^>]*>([^<]*)<\/script>/g) || [];
    return scripts.map(script => {
      try {
        const json = script.match(/>([^<]+)</)[1];
        return JSON.parse(json);
      } catch (e) {
        return null;
      }
    }).filter(Boolean);
  }

  /**
   * Validate a schema object against rules
   */
  validateSchema(schema, expectedType) {
    const issues = [];
    const type = schema['@type'];

    if (!type) {
      issues.push(`Missing @type field`);
      return issues;
    }

    if (!this.isTypeMatch(type, expectedType)) {
      issues.push(`Expected @type ${expectedType}, got ${type}`);
      return issues;
    }

    const rules = VALIDATION_RULES[expectedType];
    if (!rules) {
      return issues; // No validation rules defined
    }

    // Check required fields
    rules.required.forEach(field => {
      if (!(field in schema)) {
        issues.push(`Missing required field: ${field}`);
      }
    });

    return issues;
  }

  /**
   * Check if schema type matches expected type (handles arrays)
   */
  isTypeMatch(actual, expected) {
    if (typeof actual === 'string') {
      return actual === expected;
    }
    if (Array.isArray(actual)) {
      return actual.includes(expected);
    }
    return false;
  }

  /**
   * Find schemas of a specific type
   */
  findSchemasByType(schemas, type) {
    return schemas.filter(s => this.isTypeMatch(s['@type'], type));
  }

  /**
   * Audit a single page
   */
  auditPage(pageConfig) {
    try {
      const htmlPath = path.join(__dirname, `dist/client/index.html`);
      let html = fs.readFileSync(htmlPath, 'utf-8');

      const schemas = this.extractJsonLd(html);
      const pageResult = {
        url: pageConfig.url,
        title: pageConfig.title,
        schemasFound: [],
        issues: [],
        score: 100,
      };

      // Check each expected schema
      pageConfig.expectedSchemas.forEach(expectedType => {
        const found = this.findSchemasByType(schemas, expectedType);
        if (found.length === 0) {
          pageResult.issues.push(`Missing schema: ${expectedType}`);
          pageResult.score -= 20;
        } else {
          found.forEach((schema, idx) => {
            const validationIssues = this.validateSchema(schema, expectedType);
            pageResult.schemasFound.push({
              type: expectedType,
              count: found.length,
              issues: validationIssues,
            });

            validationIssues.forEach(issue => {
              pageResult.issues.push(`${expectedType}[${idx}]: ${issue}`);
              pageResult.score -= 5;
            });
          });
        }
      });

      // Track schema usage
      schemas.forEach(s => {
        const type = Array.isArray(s['@type']) ? s['@type'][0] : s['@type'];
        this.summaryStats.schemasFound[type] = (this.summaryStats.schemasFound[type] || 0) + 1;
      });

      pageResult.score = Math.max(0, pageResult.score);
      this.results.push(pageResult);

      return pageResult;
    } catch (error) {
      return {
        url: pageConfig.url,
        title: pageConfig.title,
        schemasFound: [],
        issues: [`Error reading page: ${error.message}`],
        score: 0,
      };
    }
  }

  /**
   * Run audit on all pages
   */
  auditAll() {
    console.log('\n📊 Schema.org Validation Audit\n');
    console.log('=' .repeat(80));

    this.summaryStats.totalPages = PAGES.length;

    PAGES.forEach(page => {
      const result = this.auditPage(page);
      if (result.score === 100) {
        this.summaryStats.passedPages++;
      } else {
        this.summaryStats.failedPages++;
      }

      this.printPageResult(result);
    });

    this.printSummary();
  }

  /**
   * Print detailed result for a page
   */
  printPageResult(result) {
    const icon = result.score === 100 ? '✅' : result.score >= 80 ? '⚠️' : '❌';
    console.log(`\n${icon} ${result.title} (${result.url})`);
    console.log(`   Score: ${result.score}/100`);

    if (result.schemasFound.length > 0) {
      console.log('   Schemas found:');
      result.schemasFound.forEach(s => {
        console.log(`     • ${s.type} (${s.count} instance${s.count > 1 ? 's' : ''})`);
        if (s.issues.length > 0) {
          s.issues.forEach(issue => console.log(`       ⚠ ${issue}`));
        }
      });
    }

    if (result.issues.length > 0) {
      console.log('   Issues:');
      result.issues.forEach(issue => console.log(`     ⚠ ${issue}`));
    }
  }

  /**
   * Print summary statistics
   */
  printSummary() {
    console.log('\n' + '='.repeat(80));
    console.log('\n📈 Summary Statistics\n');
    console.log(`Total Pages Audited: ${this.summaryStats.totalPages}`);
    console.log(`✅ Passed (100/100): ${this.summaryStats.passedPages}`);
    console.log(`⚠️  Partial Pass (80-99): ${this.summaryStats.failedPages - Math.max(0, this.summaryStats.failedPages - this.summaryStats.passedPages)}`);
    console.log(`❌ Failed (<80): ${Math.max(0, this.summaryStats.failedPages - this.summaryStats.passedPages)}`);

    console.log('\n📊 Schema Usage Across Site:');
    Object.entries(this.summaryStats.schemasFound)
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        console.log(`   • ${type}: ${count} usage${count > 1 ? 's' : ''}`);
      });

    const passRate = ((this.summaryStats.passedPages / this.summaryStats.totalPages) * 100).toFixed(1);
    console.log(`\n🎯 Overall Pass Rate: ${passRate}%`);
    console.log('\n' + '='.repeat(80) + '\n');
  }
}

// Run audit
if (require.main === module) {
  const auditor = new SchemaAuditor();
  auditor.auditAll();
}

module.exports = SchemaAuditor;
