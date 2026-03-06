import { notFound } from 'next/navigation'
import { isSupportedLocale } from '@/lib/i18n'
import { getPostBySlug } from '@/lib/api'
import { getDictionary } from '@/lib/dictionaries'
import { formatDate } from '@/lib/format'
import { RichText } from '@/components/RichText'
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
  const [post, t] = await Promise.all([getPostBySlug(slug, locale), getDictionary(locale)])

  if (!post) notFound()

  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        {post.publishedAt && (
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
        )}
        {post.readTime && <span>{post.readTime} {t.common.minRead}</span>}
      </header>

      <RichText data={post.content as Record<string, unknown>} />

      <footer>
        <a href={`/${locale}/news`}>{t.common.backToNews}</a>
      </footer>
    </article>
  )
}
