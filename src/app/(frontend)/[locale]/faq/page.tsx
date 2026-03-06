import { notFound } from 'next/navigation'
import { isSupportedLocale } from '@/lib/i18n'
import { getFaq, getCategories } from '@/lib/api'
import type { Locale } from '@/lib/i18n'

interface FaqPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}

export default async function FaqPage({ params, searchParams }: FaqPageProps) {
  const { locale: rawLocale } = await params
  const { category } = await searchParams

  if (!isSupportedLocale(rawLocale)) notFound()

  const locale = rawLocale as Locale

  const [faqResult, categoriesResult] = await Promise.all([
    getFaq(locale, category),
    getCategories(locale, 'faq'),
  ])

  return null
}
