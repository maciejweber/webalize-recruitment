import { notFound } from 'next/navigation'
import { isSupportedLocale } from '@/lib/i18n'
import { getPostBySlug, getCategories } from '@/lib/api'
import type { Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

interface NewsPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: NewsPostPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params

  if (!isSupportedLocale(rawLocale)) return {}

  const post = await getPostBySlug(slug, rawLocale as Locale)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      publishedTime: post.publishedAt ?? undefined,
      type: 'article',
    },
  }
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { locale: rawLocale, slug } = await params

  if (!isSupportedLocale(rawLocale)) notFound()

  const locale = rawLocale as Locale
  const post = await getPostBySlug(slug, locale)

  if (!post) notFound()

  return null
}
