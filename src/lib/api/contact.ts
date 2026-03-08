import { getPayloadClient } from './payload'

export async function getContactSubmissions(page = 1, limit = 50) {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'contact-submissions',
    sort: '-createdAt',
    page,
    limit,
  })
}
