import { notFound } from 'next/navigation'
import { isSupportedLocale } from '@/lib/i18n'
import { getPosts, getCategories } from '@/lib/api'
import type { Locale } from '@/lib/i18n'

interface NewsPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function NewsPage({ params, searchParams }: NewsPageProps) {
  const { locale: rawLocale } = await params
  const { category, page } = await searchParams

  if (!isSupportedLocale(rawLocale)) notFound()

  const locale = rawLocale as Locale
  const currentPage = page ? Number(page) : 1

  const [postsResult, categoriesResult] = await Promise.all([
    getPosts({ locale, category, page: currentPage }),
    getCategories(locale, 'post'),
  ])

  return null
}
