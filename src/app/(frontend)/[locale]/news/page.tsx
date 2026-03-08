import { notFound } from 'next/navigation'
import { isSupportedLocale } from '@/lib/i18n'
import { getPosts, getCategories } from '@/lib/api'
import { getDictionary } from '@/lib/dictionaries'
import { formatDate } from '@/lib/format'
import type { Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

interface NewsPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; page?: string }>
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isSupportedLocale(rawLocale)) return {}
  const t = getDictionary(rawLocale)
  return {
    title: t.pages.newsTitle,
    description: t.pages.newsDescription,
  }
}

export default async function NewsPage({ params, searchParams }: NewsPageProps) {
  const { locale: rawLocale } = await params
  const { category, page } = await searchParams

  if (!isSupportedLocale(rawLocale)) notFound()

  const locale = rawLocale as Locale
  const currentPage = page ? Number(page) : 1

  const [postsResult, categoriesResult, t] = await Promise.all([
    getPosts({ locale, category, page: currentPage }),
    getCategories(locale, 'post'),
    getDictionary(locale),
  ])

  return (
    <>
      <nav aria-label="post categories">
        <a href={`/${locale}/news`}>{t.common.all}</a>
        {categoriesResult.docs.map((cat) => (
          <a key={cat.id} href={`/${locale}/news?category=${cat.slug}`}>
            {cat.name}
          </a>
        ))}
      </nav>

      <ul>
        {postsResult.docs.map((post) => (
          <li key={post.id}>
            <article>
              <a href={`/${locale}/news/${post.slug}`}>
                <h2>{post.title}</h2>
              </a>
              {post.excerpt && <p>{post.excerpt}</p>}
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
              )}
              {post.readTime && (
                <span>
                  {post.readTime} {t.common.minRead}
                </span>
              )}
            </article>
          </li>
        ))}
      </ul>

      {postsResult.totalPages > 1 && (
        <nav aria-label="pagination">
          {currentPage > 1 && (
            <a
              href={`/${locale}/news?page=${currentPage - 1}${category ? `&category=${category}` : ''}`}
            >
              {t.common.previous}
            </a>
          )}
          <span>
            {currentPage} / {postsResult.totalPages}
          </span>
          {currentPage < postsResult.totalPages && (
            <a
              href={`/${locale}/news?page=${currentPage + 1}${category ? `&category=${category}` : ''}`}
            >
              {t.common.next}
            </a>
          )}
        </nav>
      )}
    </>
  )
}
