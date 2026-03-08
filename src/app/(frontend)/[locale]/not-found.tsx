import { headers } from 'next/headers'
import { getDictionary } from '@/lib/dictionaries'
import { DEFAULT_LOCALE, isSupportedLocale } from '@/lib/i18n'

export default async function NotFound() {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? headersList.get('x-invoke-path') ?? ''

  const rawLocale = pathname.split('/')[1]
  const locale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE

  const t = getDictionary(locale)

  return (
    <main>
      <h1>{t.pages.notFoundHeading}</h1>
      <p>{t.pages.notFoundDescription}</p>
      <a href={`/${locale}`}>{t.pages.notFoundBack}</a>
    </main>
  )
}
