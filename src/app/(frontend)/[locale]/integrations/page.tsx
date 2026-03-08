import { notFound } from 'next/navigation'
import { isSupportedLocale } from '@/lib/i18n'
import { getIntegrations } from '@/lib/api'
import { getDictionary } from '@/lib/dictionaries'
import type { Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

interface IntegrationsPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: IntegrationsPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isSupportedLocale(rawLocale)) return {}
  const t = getDictionary(rawLocale)
  return {
    title: t.pages.integrationsTitle,
    description: t.pages.integrationsDescription,
  }
}

export default async function IntegrationsPage({ params }: IntegrationsPageProps) {
  const { locale: rawLocale } = await params

  if (!isSupportedLocale(rawLocale)) notFound()

  const locale = rawLocale as Locale
  const [integrationsResult, t] = await Promise.all([
    getIntegrations(locale),
    getDictionary(locale),
  ])

  return (
    <ul>
      {integrationsResult.docs.map((integration) => (
        <li key={integration.id}>
          <h2>{integration.name}</h2>
          {integration.description && <p>{integration.description}</p>}
          {integration.url && (
            <a href={integration.url} target="_blank" rel="noreferrer">
              {t.common.learnMore}
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}
