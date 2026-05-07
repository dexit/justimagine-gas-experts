#!/usr/bin/env node

/**
 * Schema.org Source Code Validator
 * Validates schema function implementations in source code
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Page configurations with expected schema functions
const PAGES = [
  {
    name: 'Homepage',
    url: '/',
    file: 'src/routes/index.tsx',
    expectedSchemas: [
      'localBusinessJsonLd',
      'offerCatalogJsonLd',
      'homepageBreadcrumbsJsonLd',
      'relatedLinksJsonLd',
    ],
    description: 'Full schema.org implementation with business, offers, breadcrumbs, and links',
  },
  {
    name: 'Services',
    url: '/services',
    file: 'src/routes/services.tsx',
    expectedSchemas: ['serviceJsonLd'],
    description: 'Service listing with structured data',
  },
  {
    name: 'Service Detail',
    url: '/services/{slug}',
    file: 'src/routes/services.$serviceSlug.tsx',
    expectedSchemas: ['serviceJsonLd', 'breadcrumbJsonLd'],
    description: 'Individual service with breadcrumbs and FAQ',
  },
  {
    name: 'Service × Area',
    url: '/services/{service}/{area}',
    file: 'src/routes/services.$serviceSlug.$areaSlug.tsx',
    expectedSchemas: ['localServiceJsonLd', 'breadcrumbJsonLd'],
    description: 'Service in specific area with breadcrumbs',
  },
  {
    name: 'Pricing',
    url: '/pricing',
    file: 'src/routes/pricing.tsx',
    expectedSchemas: ['productOfferJsonLd', 'contactActionJsonLd'],
    description: 'Product pricing with contact action',
  },
  {
    name: 'Contact',
    url: '/contact',
    file: 'src/routes/contact.tsx',
    expectedSchemas: ['contactActionJsonLd'],
    description: 'Contact form with action schema',
  },
  {
    name: 'Gas Safety',
    url: '/safety',
    file: 'src/routes/safety.tsx',
    expectedSchemas: ['contactActionJsonLd'],
    description: 'Safety information with contact action',
  },
  {
    name: 'Landlord',
    url: '/landlord',
    file: 'src/routes/landlord.tsx',
    expectedSchemas: ['serviceJsonLd', 'productOfferJsonLd'],
    description: 'Landlord services with products and pricing',
  },
  {
    name: 'Emergency',
    url: '/emergency',
    file: 'src/routes/emergency.tsx',
    expectedSchemas: ['serviceJsonLd', 'contactActionJsonLd'],
    description: 'Emergency service information',
  },
  {
    name: 'Areas',
    url: '/areas',
    file: 'src/routes/areas.index.tsx',
    expectedSchemas: ['areaPlaceJsonLd'],
    description: 'Geographic service areas',
  },
  {
    name: 'Area Detail',
    url: '/areas/{slug}',
    file: 'src/routes/areas.$areaSlug.tsx',
    expectedSchemas: ['areaPlaceJsonLd', 'breadcrumbJsonLd'],
    description: 'Specific area with breadcrumbs',
  },
  {
    name: 'FAQ',
    url: '/faq',
    file: 'src/routes/faq.tsx',
    expectedSchemas: ['faqJsonLd'],
    description: 'FAQ page with structured Q&A',
  },
  {
    name: 'Reviews',
    url: '/reviews',
    file: 'src/routes/reviews.tsx',
    expectedSchemas: ['localBusinessJsonLd'],
    description: 'Reviews and testimonials',
  },
];

class SourceValidator {
  constructor() {
    this.results = [];
    this.stats = {
      totalPages: 0,
      pagesWithAllSchemas: 0,
      pagesWithMissingSchemas: 0,
      schemasFoundCount: 0,
    };
  }

  /**
   * Check if file exists and contains schema functions
   */
  validatePageFile(filePath, expectedSchemas) {
    try {
      if (!fs.existsSync(filePath)) {
        return {
          exists: false,
          content: null,
          found: [],
          missing: expectedSchemas,
          hasJsonLd: false,
        };
      }

      const content = fs.readFileSync(filePath, 'utf-8');

      // Check for import of seo functions
      const hasJsonLdImport = /from\s+['"]@\/lib\/seo['"]/.test(content) ||
                             /from\s+['"][^'"]*\/seo['""]/.test(content);

      const found = [];
      const missing = [];

      expectedSchemas.forEach(schema => {
        if (content.includes(schema)) {
          found.push(schema);
        } else {
          missing.push(schema);
        }
      });

      // Check for jsonLdScript calls
      const jsonLdScriptCalls = (content.match(/jsonLdScript\(/g) || []).length;

      return {
        exists: true,
        content,
        found,
        missing,
        hasJsonLdImport,
        jsonLdScriptCount: jsonLdScriptCalls,
        hasHead: /head:\s*\(\)/.test(content),
        hasScripts: /scripts:\s*\[/.test(content),
      };
    } catch (error) {
      return {
        exists: false,
        error: error.message,
      };
    }
  }

  /**
   * Run validation on all pages
   */
  validateAll() {
    console.log('\n📋 Schema.org Implementation Audit\n');
    console.log('=' .repeat(120));
    console.log('Checking JSON-LD schema implementations across all pages...\n');

    PAGES.forEach(page => {
      const filePath = path.join(__dirname, page.file);
      const validation = this.validatePageFile(filePath, page.expectedSchemas);

      const result = {
        name: page.name,
        url: page.url,
        description: page.description,
        file: page.file,
        validation,
        score: this.calculateScore(validation, page.expectedSchemas),
      };

      this.results.push(result);
      this.stats.totalPages++;

      if (validation.missing && validation.missing.length === 0) {
        this.stats.pagesWithAllSchemas++;
      } else if (validation.missing && validation.missing.length > 0) {
        this.stats.pagesWithMissingSchemas++;
      }

      this.printPageResult(result);
    });

    this.printSummary();
  }

  /**
   * Calculate validation score
   */
  calculateScore(validation, expected) {
    if (!validation.exists) return 0;

    let score = 100;

    // Deduct points for missing schemas
    if (validation.missing) {
      score -= validation.missing.length * 20;
    }

    // Deduct if no JSON-LD import
    if (!validation.hasJsonLdImport) {
      score -= 10;
    }

    // Deduct if no scripts in head
    if (!validation.hasScripts) {
      score -= 10;
    }

    return Math.max(0, score);
  }

  /**
   * Print result for single page
   */
  printPageResult(result) {
    const icon = this.getIcon(result.score);
    const { validation } = result;

    console.log(`${icon} ${result.name} (${result.url})`);
    console.log(`   File: ${result.file}`);
    console.log(`   Score: ${result.score}/100`);

    if (!validation.exists) {
      console.log(`   ❌ File not found\n`);
      return;
    }

    if (validation.error) {
      console.log(`   ❌ Error reading file: ${validation.error}\n`);
      return;
    }

    // Show found schemas
    if (validation.found && validation.found.length > 0) {
      console.log(`   ✅ Found schemas:`);
      validation.found.forEach(s => console.log(`      • ${s}`));
    }

    // Show missing schemas
    if (validation.missing && validation.missing.length > 0) {
      console.log(`   ❌ Missing schemas:`);
      validation.missing.forEach(s => console.log(`      • ${s}`));
    }

    // Show implementation details
    console.log(`   Details:`);
    console.log(`      • Has JSON-LD import: ${validation.hasJsonLdImport ? '✅' : '❌'}`);
    console.log(`      • Has head() function: ${validation.hasHead ? '✅' : '❌'}`);
    console.log(`      • Has scripts array: ${validation.hasScripts ? '✅' : '❌'}`);
    console.log(`      • jsonLdScript() calls: ${validation.jsonLdScriptCount}`);

    console.log();
  }

  /**
   * Get icon based on score
   */
  getIcon(score) {
    if (score === 100) return '✅';
    if (score >= 80) return '⚠️';
    if (score >= 50) return '❌';
    return '🔴';
  }

  /**
   * Print final summary
   */
  printSummary() {
    console.log('=' .repeat(120));
    console.log('\n📊 Summary\n');

    const completionRate = ((this.stats.pagesWithAllSchemas / this.stats.totalPages) * 100).toFixed(1);

    console.log(`Total Pages Audited: ${this.stats.totalPages}`);
    console.log(`✅ Pages with all expected schemas: ${this.stats.pagesWithAllSchemas}`);
    console.log(`⚠️  Pages with missing schemas: ${this.stats.pagesWithMissingSchemas}`);
    console.log(`\n🎯 Schema Coverage: ${completionRate}%`);

    // Score distribution
    const scoreDistribution = {
      perfect: this.results.filter(r => r.score === 100).length,
      good: this.results.filter(r => r.score >= 80 && r.score < 100).length,
      fair: this.results.filter(r => r.score >= 50 && r.score < 80).length,
      poor: this.results.filter(r => r.score < 50).length,
    };

    console.log('\n📈 Score Distribution:');
    console.log(`   ✅ Perfect (100): ${scoreDistribution.perfect}`);
    console.log(`   ⚠️  Good (80-99): ${scoreDistribution.good}`);
    console.log(`   ❌ Fair (50-79): ${scoreDistribution.fair}`);
    console.log(`   🔴 Poor (<50): ${scoreDistribution.poor}`);

    const avgScore = (this.results.reduce((sum, r) => sum + r.score, 0) / this.stats.totalPages).toFixed(1);
    console.log(`\n📊 Average Score: ${avgScore}/100`);

    console.log('\n' + '=' .repeat(120));
    console.log('\n✅ Audit Complete\n');
  }
}

// Run validation
const validator = new SourceValidator();
validator.validateAll();
