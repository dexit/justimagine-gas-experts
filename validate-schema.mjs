#!/usr/bin/env node

/**
 * Schema.org and Google Rich Results Validator
 * Validates JSON-LD markup on all key pages
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Validation rules for key schema types
const VALIDATION_RULES = {
  LocalBusiness: {
    required: ['@context', '@type', 'name', 'telephone', 'email', 'address'],
    optional: ['logo', 'image', 'areaServed', 'openingHoursSpecification', 'hasOfferCatalog', 'aggregateRating'],
    description: 'Core business identity and contact information',
  },
  OfferCatalog: {
    required: ['@type', 'name', 'itemListElement'],
    optional: ['description'],
    description: 'Service catalog with structured offers',
  },
  BreadcrumbList: {
    required: ['@type', 'itemListElement'],
    optional: [],
    description: 'Navigation breadcrumb schema',
  },
  ItemList: {
    required: ['@type', 'itemListElement'],
    optional: ['name', 'description'],
    description: 'Generic item list (for related links)',
  },
  Organization: {
    required: ['@context', '@type', 'name', 'url'],
    optional: ['logo', 'contactPoint', 'sameAs', 'email', 'telephone'],
    description: 'Organization details',
  },
  Service: {
    required: ['@type', 'name', 'description', 'provider'],
    optional: ['areaServed', 'offers', 'aggregateRating', 'serviceType', 'potentialAction'],
    description: 'Service offering with provider',
  },
  FAQPage: {
    required: ['@type', 'mainEntity'],
    optional: [],
    description: 'FAQ page with Q&A structured data',
  },
  Product: {
    required: ['@type', 'name', 'description'],
    optional: ['image', 'brand', 'aggregateRating', 'offers'],
    description: 'Product offering',
  },
  Offer: {
    required: ['@type', 'name'],
    optional: ['description', 'price', 'priceCurrency', 'availability', 'url'],
    description: 'Specific offer with pricing',
  },
  AggregateRating: {
    required: ['@type', 'ratingValue'],
    optional: ['reviewCount', 'bestRating', 'worstRating'],
    description: 'Aggregate rating information',
  },
  Review: {
    required: ['@type', 'author', 'reviewRating'],
    optional: ['reviewBody', 'datePublished'],
    description: 'Individual review data',
  },
  Question: {
    required: ['@type', 'name', 'acceptedAnswer'],
    optional: [],
    description: 'FAQ question with answer',
  },
  ContactPoint: {
    required: ['@type'],
    optional: ['telephone', 'email', 'contactType', 'areaServed'],
    description: 'Contact information',
  },
};

class SchemaValidator {
  constructor() {
    this.results = [];
    this.allSchemas = {};
    this.stats = {
      totalPages: 0,
      totalSchemas: 0,
      passedPages: 0,
      schemasByType: {},
      criticalIssues: [],
    };
  }

  /**
   * Extract JSON-LD from HTML string
   */
  extractJsonLd(html) {
    const jsonLdRegex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
    const matches = [...html.matchAll(jsonLdRegex)];

    return matches
      .map(match => {
        try {
          return JSON.parse(match[1]);
        } catch (e) {
          console.error(`Error parsing JSON-LD: ${e.message}`);
          return null;
        }
      })
      .filter(Boolean);
  }

  /**
   * Check if type matches (handles arrays like ["LocalBusiness", "Plumber"])
   */
  typeMatches(actual, expected) {
    if (!actual) return false;
    const actualTypes = Array.isArray(actual) ? actual : [actual];
    return actualTypes.includes(expected);
  }

  /**
   * Validate a single schema against rules
   */
  validateSchema(schema, ruleName) {
    const issues = [];
    const warnings = [];
    const rules = VALIDATION_RULES[ruleName];

    if (!rules) {
      return { issues, warnings, missing: [], extra: [], score: 100 };
    }

    // Check required fields
    const missing = [];
    rules.required.forEach(field => {
      if (!(field in schema)) {
        missing.push(field);
        issues.push(`Missing required field: ${field}`);
      }
    });

    // Check for empty values in important fields
    ['name', 'description', 'telephone', 'email'].forEach(field => {
      if (field in schema && !schema[field]) {
        issues.push(`Field "${field}" is empty`);
      }
    });

    // Check areaServed structure
    if (schema.areaServed && !this.validateAreaServed(schema.areaServed)) {
      warnings.push(`areaServed structure may be incomplete`);
    }

    // Check offers structure
    if (schema.offers && !this.validateOffers(schema.offers)) {
      warnings.push(`offers structure incomplete - missing price or currency`);
    }

    const score = Math.max(0, 100 - (issues.length * 15) - (warnings.length * 5));
    return { issues, warnings, missing, score };
  }

  /**
   * Validate areaServed structure
   */
  validateAreaServed(areaServed) {
    if (Array.isArray(areaServed)) {
      return areaServed.length > 0 && areaServed.some(a => a['@type'] || a.name);
    }
    return areaServed['@type'] || areaServed.name;
  }

  /**
   * Validate offers structure
   */
  validateOffers(offers) {
    if (Array.isArray(offers)) {
      return offers.some(o => o.price && o.priceCurrency);
    }
    return offers.price && offers.priceCurrency;
  }

  /**
   * Audit a page file
   */
  auditPageFile(filePath, urlPath, expectedSchemas) {
    try {
      const html = fs.readFileSync(filePath, 'utf-8');
      const schemas = this.extractJsonLd(html);

      const pageResult = {
        url: urlPath,
        file: path.basename(filePath),
        schemasFound: [],
        missingSchemas: [],
        issues: [],
        warnings: [],
        score: 100,
      };

      // Track all schemas
      schemas.forEach(schema => {
        const type = Array.isArray(schema['@type']) ? schema['@type'][0] : schema['@type'];
        if (!this.allSchemas[type]) {
          this.allSchemas[type] = [];
        }
        this.allSchemas[type].push(schema);
      });

      // Check expected schemas
      expectedSchemas.forEach(expectedType => {
        const found = schemas.filter(s => this.typeMatches(s['@type'], expectedType));

        if (found.length === 0) {
          pageResult.missingSchemas.push(expectedType);
          pageResult.issues.push(`Missing expected schema: ${expectedType}`);
          pageResult.score -= 20;
        } else {
          found.forEach((schema, idx) => {
            const validation = this.validateSchema(schema, expectedType);

            pageResult.schemasFound.push({
              type: expectedType,
              valid: validation.score === 100,
              score: validation.score,
              issues: validation.issues,
              warnings: validation.warnings,
            });

            validation.issues.forEach(issue => {
              pageResult.issues.push(`${expectedType}[${idx}]: ${issue}`);
            });

            validation.warnings.forEach(warning => {
              pageResult.warnings.push(`${expectedType}[${idx}]: ${warning}`);
            });

            pageResult.score -= (100 - validation.score);
          });
        }
      });

      pageResult.score = Math.max(0, pageResult.score);
      if (pageResult.score === 100) {
        this.stats.passedPages++;
      }

      this.results.push(pageResult);
      this.stats.totalPages++;

      return pageResult;
    } catch (error) {
      return {
        url: urlPath,
        file: path.basename(filePath),
        error: error.message,
        score: 0,
      };
    }
  }

  /**
   * Run validation on all page files
   */
  validateAllPages() {
    const pages = [
      { file: 'index.html', url: '/', schemas: ['LocalBusiness', 'OfferCatalog', 'BreadcrumbList', 'ItemList'] },
      { file: 'services/index.html', url: '/services', schemas: ['Service', 'ItemList'] },
      { file: 'pricing/index.html', url: '/pricing', schemas: ['Product', 'Offer', 'AggregateRating'] },
      { file: 'contact/index.html', url: '/contact', schemas: ['Organization', 'ContactPoint'] },
      { file: 'safety/index.html', url: '/safety', schemas: ['Service'] },
      { file: 'landlord/index.html', url: '/landlord', schemas: ['Service', 'Product'] },
      { file: 'emergency/index.html', url: '/emergency', schemas: ['Service'] },
      { file: 'areas/index.html', url: '/areas', schemas: ['ItemList'] },
      { file: 'faq/index.html', url: '/faq', schemas: ['FAQPage', 'Question'] },
      { file: 'reviews/index.html', url: '/reviews', schemas: ['Review', 'AggregateRating'] },
    ];

    console.log('\n🔍 Schema.org Validation Report\n');
    console.log('=' .repeat(100));
    console.log('Validating JSON-LD schemas across all pages...\n');

    const clientDir = path.join(__dirname, 'dist/client');

    pages.forEach(page => {
      const filePath = path.join(clientDir, page.file);

      if (fs.existsSync(filePath)) {
        const result = this.auditPageFile(filePath, page.url, page.schemas);
        this.printPageResult(result);
      } else {
        console.log(`⚠️  Page not found: ${page.url} (${page.file})`);
      }
    });

    this.printSummary();
  }

  /**
   * Print result for a single page
   */
  printPageResult(result) {
    if (result.error) {
      console.log(`❌ Error auditing ${result.url}: ${result.error}`);
      return;
    }

    const icon = result.score === 100 ? '✅' : result.score >= 80 ? '⚠️' : '❌';
    console.log(`\n${icon} ${result.url} (Score: ${result.score}/100)`);

    if (result.schemasFound.length > 0) {
      result.schemasFound.forEach(s => {
        const check = s.valid ? '✓' : '✗';
        console.log(`   ${check} ${s.type} (${s.score}/100)`);
        if (s.issues.length > 0) {
          s.issues.forEach(i => console.log(`      ⚠ ${i}`));
        }
      });
    }

    if (result.missingSchemas.length > 0) {
      console.log(`   Missing schemas: ${result.missingSchemas.join(', ')}`);
    }

    if (result.warnings.length > 0) {
      console.log(`   Warnings:`);
      result.warnings.forEach(w => console.log(`      ℹ ${w}`));
    }
  }

  /**
   * Print summary statistics
   */
  printSummary() {
    console.log('\n' + '=' .repeat(100));
    console.log('\n📊 Summary Report\n');

    console.log(`Total Pages: ${this.stats.totalPages}`);
    console.log(`✅ Pages with 100/100 score: ${this.stats.passedPages}`);
    console.log(`⚠️  Pages with issues: ${this.stats.totalPages - this.stats.passedPages}`);

    const avgScore = this.results.reduce((sum, r) => sum + (r.score || 0), 0) / this.stats.totalPages;
    console.log(`📈 Average Score: ${avgScore.toFixed(1)}/100`);

    console.log('\n📋 Schema Types Found Across Site:\n');
    Object.entries(this.allSchemas)
      .sort((a, b) => b[1].length - a[1].length)
      .forEach(([type, schemas]) => {
        console.log(`   • ${type}: ${schemas.length} instance${schemas.length > 1 ? 's' : ''}`);
      });

    console.log('\n' + '=' .repeat(100));
    console.log('\n✅ Validation Complete\n');
  }
}

// Main execution
const validator = new SchemaValidator();
validator.validateAllPages();
