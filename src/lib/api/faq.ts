import { getPayloadClient } from './payload'
import type { Locale } from '../i18n'

export async function getFaq(locale: Locale, categorySlug?: string) {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'faq',
    locale,
    depth: 1,
    limit: 200,
    sort: 'order',
    where: categorySlug ? { 'category.slug': { equals: categorySlug } } : undefined,
  })
}
