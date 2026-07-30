import fs from 'fs';
import path from 'path';

// Simple .env parser to load vars into process.env
if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const parts = line.trim().split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/(^['"]|['"]$)/g, '');
      if (key && !key.startsWith('#')) {
        process.env[key] = val;
      }
    }
  });
}

const SEO_APPROVED = process.env.SEO_APPROVED === 'true';
const SITE_ENV = process.env.SITE_ENV || 'development';

const CRITICAL_PLACEHOLDERS = [
  'Product Name',
  'Product Description',
  '01234 567890',
  'Placeholder Company Number',
  'Placeholder VAT',
  'Placeholder Address'
];

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      // Skip build outputs, config directories, and dependency folders
      if (f !== 'node_modules' && f !== '.astro' && f !== 'dist' && f !== '.git' && f !== '.vscode') {
        walkDir(dirPath, callback);
      }
    } else {
      callback(dirPath);
    }
  });
}

let placeholdersFound = [];

walkDir('./src', (filePath) => {
  const ext = path.extname(filePath);
  if (['.astro', '.vue', '.ts', '.js', '.css', '.html'].includes(ext)) {
    const content = fs.readFileSync(filePath, 'utf8');
    CRITICAL_PLACEHOLDERS.forEach(placeholder => {
      if (content.toLowerCase().includes(placeholder.toLowerCase())) {
        placeholdersFound.push({ filePath, placeholder });
      }
    });
  }
});

if (placeholdersFound.length > 0) {
  console.warn('\x1b[33m%s\x1b[0m', '⚠️  SEO Validation Warnings: Found placeholder values in source files:');
  placeholdersFound.forEach(({ filePath, placeholder }) => {
    console.warn(`  - File: ${filePath} contains placeholder: "${placeholder}"`);
  });

  if (SEO_APPROVED && SITE_ENV === 'production') {
    console.error('\x1b[31m%s\x1b[0m', '❌ ERROR: Cannot run approved production build with active placeholder values.');
    process.exit(1);
  } else {
    console.log('\x1b[32m%s\x1b[0m', 'ℹ️  Build allowed: SEO is not approved or not in production env.');
  }
} else {
  console.log('\x1b[32m%s\x1b[0m', '✅ SEO Validation Passed: No critical placeholders found.');
}
