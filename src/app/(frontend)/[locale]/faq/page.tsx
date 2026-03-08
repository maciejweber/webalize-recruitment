import { notFound } from 'next/navigation'
import { isSupportedLocale } from '@/lib/i18n'
import { getFaq, getCategories } from '@/lib/api'
import { getDictionary } from '@/lib/dictionaries'
import { RichText } from '@/components/RichText'
import type { Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

interface FaqPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}

export async function generateMetadata({ params }: FaqPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isSupportedLocale(rawLocale)) return {}
  const t = getDictionary(rawLocale)
  return {
    title: t.pages.faqTitle,
    description: t.pages.faqDescription,
  }
}

export default async function FaqPage({ params, searchParams }: FaqPageProps) {
  const { locale: rawLocale } = await params
  const { category } = await searchParams

  if (!isSupportedLocale(rawLocale)) notFound()

  const locale = rawLocale as Locale

  const [faqResult, categoriesResult, t] = await Promise.all([
    getFaq(locale, category),
    getCategories(locale, 'faq'),
    getDictionary(locale),
  ])

  return (
    <>
      <nav aria-label="faq categories">
        <a href={`/${locale}/faq`}>{t.common.all}</a>
        {categoriesResult.docs.map((cat) => (
          <a key={cat.id} href={`/${locale}/faq?category=${cat.slug}`}>
            {cat.name}
          </a>
        ))}
      </nav>

      <dl>
        {faqResult.docs.map((item) => (
          <div key={item.id}>
            <dt>{item.question}</dt>
            <dd>
              <RichText data={item.answer as Record<string, unknown>} />
            </dd>
          </div>
        ))}
      </dl>
    </>
  )
}
