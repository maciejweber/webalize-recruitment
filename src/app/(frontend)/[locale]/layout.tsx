import { notFound } from 'next/navigation'
import { isSupportedLocale } from '@/lib/i18n'
import { getHeader, getFooter } from '@/lib/api'
import { getDictionary } from '@/lib/dictionaries'
import { normalizeHref } from '@/lib/format'
import type { Locale } from '@/lib/i18n'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params

  if (!isSupportedLocale(rawLocale)) notFound()

  const locale = rawLocale as Locale

  const [header, footer, t] = await Promise.all([
    getHeader(locale),
    getFooter(locale),
    getDictionary(locale),
  ])

  return (
    <>
      <header>
        <nav aria-label="main navigation">
          {header.navItems?.map((item, i) => (
            <a key={i} href={item.href} target={item.openInNewTab ? '_blank' : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
        {header.ctaLabel && <button type="button">{header.ctaLabel}</button>}
        {/* locale switcher — links handled by the UI layer */}
      </header>

      <main>{children}</main>

      <footer>
        {footer.columns?.map((col, i) => (
          <section key={i}>
            {col.heading && <h3>{col.heading}</h3>}
            <ul>
              {col.links?.map((link, j) => (
                <li key={j}>
                  <a
                    href={normalizeHref(link.href)}
                    target={link.openInNewTab ? '_blank' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {footer.copyrightText && <p>{footer.copyrightText}</p>}
      </footer>
    </>
  )
}

export async function generateStaticParams() {
  return [{ locale: 'pl' }, { locale: 'en' }, { locale: 'de' }]
}
