// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'fs';

// Load .env values for process.env
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

const siteUrl = process.env.SITE_URL || 'https://nexaconcern.site';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  integrations: [
    sitemap({
      filter: (page) => {
        try {
          const url = new URL(page);
          return url.pathname === '/' || url.pathname === '';
        } catch (e) {
          return false;
        }
      }
    })
  ]
});