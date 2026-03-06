import { notFound } from 'next/navigation'
import { isSupportedLocale } from '@/lib/i18n'
import { getHeader, getFooter } from '@/lib/api'
import type { Locale } from '@/lib/i18n'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params

  if (!isSupportedLocale(rawLocale)) notFound()

  const locale = rawLocale as Locale

  const [header, footer] = await Promise.all([getHeader(locale), getFooter(locale)])

  return <>{children}</>
}

export async function generateStaticParams() {
  return [{ locale: 'pl' }, { locale: 'en' }, { locale: 'de' }]
}
