export function generateCanonicalUrl(siteUrl: string, pathname: string, siteEnv: string, seoApproved: boolean): string {
  let baseUrl = siteUrl || 'https://myconcern.site';
  
  // Use HTTPS in approved production
  if (siteEnv === 'production' && seoApproved) {
    baseUrl = baseUrl.replace(/^http:/i, 'https:');
  }
  
  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch (e) {
    url = new URL('https://myconcern.site');
  }

  // Remove query parameters and hash fragments
  url.search = '';
  url.hash = '';

  // Standardize trailing slash on pathname
  let cleanPath = pathname.split('?')[0].split('#')[0];
  if (!cleanPath.endsWith('/')) {
    cleanPath += '/';
  }
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  
  url.pathname = cleanPath;

  // Never output localhost in approved production
  if (siteEnv === 'production' && seoApproved) {
    if (url.hostname.includes('localhost') || url.hostname.includes('myconcern.site')) {
      return 'https://myconcern.site' + cleanPath;
    }
  }

  return url.toString();
}

export function getRobotsContent(siteEnv: string, seoApproved: boolean): string {
  // Development & Staging: noindex, nofollow
  // Production unapproved: noindex, nofollow
  // Production approved: index, follow
  if (siteEnv === 'production' && seoApproved) {
    return 'index, follow';
  }
  return 'noindex, nofollow';
}
