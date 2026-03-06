import { getPayloadClient } from './payload'
import type { Locale } from '../i18n'

export async function getCategories(locale: Locale, type?: 'post' | 'faq') {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'categories',
    locale,
    depth: 0,
    limit: 100,
    sort: 'name',
    where: type ? { type: { equals: type } } : undefined,
  })
}
