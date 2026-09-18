/**
 * Utility functions for Google Maps and OpenStreetMap embed iframe sanitization,
 * extraction, and responsive rendering.
 */

export const DEFAULT_MAP_EMBED_CODE = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.9501964112824!2d76.79173985798217!3d30.644296504010327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feb000446373b%3A0x1f90de76ad89d2b4!2sSbp%20city%20of%20dreams!5e0!3m2!1sen!2sin!4v1789748501524!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;

export const DEFAULT_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=SBP+City+of+dreams+high+ground+road+zirakpur+140603`;

/**
 * Validates whether a URL hostname is a trusted map provider (Google Maps or OpenStreetMap)
 */
export function isTrustedMapUrl(urlStr: string): boolean {
  try {
    const parsed = new URL(urlStr.trim());
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return false;
    }

    const host = parsed.hostname.toLowerCase();

    // Trusted Google Maps hostnames
    const isGoogle = 
      host === 'google.com' ||
      host.endsWith('.google.com') ||
      host === 'maps.google.com' ||
      host.includes('google.co.') ||
      host.includes('google.') && parsed.pathname.includes('/maps');

    // Trusted OpenStreetMap hostnames
    const isOpenStreetMap =
      host === 'openstreetmap.org' ||
      host.endsWith('.openstreetmap.org');

    return isGoogle || isOpenStreetMap;
  } catch {
    return false;
  }
}

/**
 * Extracts and sanitizes the embed source URL from an iframe HTML string or raw URL.
 * Returns null if invalid or untrusted.
 */
export function extractMapEmbedSrc(embedHtmlOrUrl: string | undefined | null): string | null {
  if (!embedHtmlOrUrl) return null;
  const trimmed = embedHtmlOrUrl.trim();
  if (!trimmed) return null;

  let candidateUrl = '';

  // 1. Check if it's an iframe tag
  const iframeMatch = trimmed.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i);
  if (iframeMatch && iframeMatch[1]) {
    candidateUrl = iframeMatch[1].trim();
  } else if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    // 2. Or if direct URL was provided
    candidateUrl = trimmed;
  } else {
    // 3. Check for any http/https URL in the string
    const urlMatch = trimmed.match(/https?:\/\/[^\s"'<>]+/i);
    if (urlMatch && urlMatch[0]) {
      candidateUrl = urlMatch[0];
    }
  }

  if (!candidateUrl) return null;

  // Unescape HTML entities if any (e.g. &amp; -> &)
  candidateUrl = candidateUrl.replace(/&amp;/g, '&');

  // Verify against trusted domains
  if (isTrustedMapUrl(candidateUrl)) {
    return candidateUrl;
  }

  return null;
}

/**
 * Validates if the given string represents a usable map embed code
 */
export function isValidMapEmbedCode(input: string | undefined | null): boolean {
  return extractMapEmbedSrc(input) !== null;
}
