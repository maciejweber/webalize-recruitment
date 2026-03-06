import { getPayloadClient } from './payload'
import type { Locale } from '../i18n'

export async function getIntegrations(locale: Locale, featured?: boolean) {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'integrations',
    locale,
    depth: 1,
    limit: 100,
    sort: 'order',
    where: featured !== undefined ? { featured: { equals: featured } } : undefined,
  })
}
