import { notFound } from 'next/navigation'
import { isSupportedLocale } from '@/lib/i18n'
import { getPosts, getIntegrations, getFaq } from '@/lib/api'
import type { Locale } from '@/lib/i18n'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: rawLocale } = await params

  if (!isSupportedLocale(rawLocale)) notFound()

  const locale = rawLocale as Locale

  const [postsResult, integrationsResult, faqResult] = await Promise.all([
    getPosts({ locale, limit: 3 }),
    getIntegrations(locale, true),
    getFaq(locale),
  ])

  return null
}
