import { getPayloadClient } from './payload'
import type { Locale } from '../i18n'

interface GetPostsOptions {
  locale: Locale
  category?: string
  page?: number
  limit?: number
}

export async function getPosts({ locale, category, page = 1, limit = 12 }: GetPostsOptions) {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'posts',
    locale,
    sort: '-publishedAt',
    depth: 1,
    page,
    limit,
    where: category ? { 'category.slug': { equals: category } } : undefined,
  })
}

export async function getPostBySlug(slug: string, locale: Locale) {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'posts',
    locale,
    depth: 2,
    limit: 1,
    where: { slug: { equals: slug } },
  })

  return docs[0] ?? null
}
