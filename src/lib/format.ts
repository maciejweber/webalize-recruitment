import type { Locale } from './i18n'

/**
 * Formats an ISO date string into a locale-aware human-readable format.
 * e.g. "5 marca 2026" (pl), "March 5, 2026" (en), "5. März 2026" (de)
 */
export function formatDate(isoString: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(isoString))
}

/**
 * Normalizes a CMS-provided href so email and phone links work correctly.
 * CMS editors often forget to add mailto: / tel: prefixes.
 */
export function normalizeHref(href: string): string {
  if (!href) return href
  if (href.startsWith('http') || href.startsWith('/') || href.startsWith('#')) return href
  if (/^[\w.+-]+@[\w-]+\.\w+$/.test(href)) return `mailto:${href}`
  if (/^[+\d\s()-]{7,}$/.test(href)) return `tel:${href.replace(/\s/g, '')}`
  return href
}
