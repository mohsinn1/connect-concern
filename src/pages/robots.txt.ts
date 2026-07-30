import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const SITE_URL = import.meta.env.SITE_URL || 'https://novaconcerns.site';
  const SITE_ENV = import.meta.env.SITE_ENV || 'development';
  const SEO_APPROVED = import.meta.env.SEO_APPROVED === 'true';

  let body = '';
  if (SITE_ENV === 'production' && SEO_APPROVED) {
    // Approved production: allow crawl and reference the sitemap-index.xml
    body = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL.replace(/\/$/, '')}/sitemap-index.xml\n`;
  } else {
    // Staging / Dev / Unapproved: block all crawlers
    body = `User-agent: *\nDisallow: /\n`;
  }

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
