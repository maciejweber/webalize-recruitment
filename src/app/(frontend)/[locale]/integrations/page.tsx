import { notFound } from 'next/navigation'
import { isSupportedLocale } from '@/lib/i18n'
import { getIntegrations } from '@/lib/api'
import type { Locale } from '@/lib/i18n'

interface IntegrationsPageProps {
  params: Promise<{ locale: string }>
}

export default async function IntegrationsPage({ params }: IntegrationsPageProps) {
  const { locale: rawLocale } = await params

  if (!isSupportedLocale(rawLocale)) notFound()

  const locale = rawLocale as Locale
  const integrationsResult = await getIntegrations(locale)

  return null
}
