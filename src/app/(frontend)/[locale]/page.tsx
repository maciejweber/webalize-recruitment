import { notFound } from 'next/navigation'
import { isSupportedLocale } from '@/lib/i18n'
import { getPosts, getIntegrations, getFaq } from '@/lib/api'
import { getDictionary } from '@/lib/dictionaries'
import { formatDate } from '@/lib/format'
import type { Locale } from '@/lib/i18n'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: rawLocale } = await params

  if (!isSupportedLocale(rawLocale)) notFound()

  const locale = rawLocale as Locale

  const [postsResult, integrationsResult, faqResult, t] = await Promise.all([
    getPosts({ locale, limit: 3 }),
    getIntegrations(locale, true),
    getFaq(locale),
    getDictionary(locale),
  ])

  return (
    <>
      <section aria-label="latest posts">
        <ul>
          {postsResult.docs.map((post) => (
            <li key={post.id}>
              <a href={`/${locale}/news/${post.slug}`}>
                <span>{post.title}</span>
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
                )}
              </a>
            </li>
          ))}
        </ul>
        <a href={`/${locale}/news`}>{t.common.seeAllPosts}</a>
      </section>

      <section aria-label="integrations">
        <ul>
          {integrationsResult.docs.map((integration) => (
            <li key={integration.id}>
              <span>{integration.name}</span>
              {integration.description && <p>{integration.description}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="faq">
        <dl>
          {faqResult.docs.map((item) => (
            <div key={item.id}>
              <dt>{item.question}</dt>
            </div>
          ))}
        </dl>
        <a href={`/${locale}/faq`}>{t.common.seeAllFaq}</a>
      </section>
    </>
  )
}
