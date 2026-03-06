import { getPayloadClient } from './payload'
import type { Locale } from '../i18n'

export async function getHeader(locale: Locale) {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'header', locale, depth: 0 })
}

export async function getFooter(locale: Locale) {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'footer', locale, depth: 0 })
}
