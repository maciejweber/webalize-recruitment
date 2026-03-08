import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, isSupportedLocale } from '@/lib/i18n'

function detectLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') ?? ''

  for (const segment of acceptLanguage.split(',')) {
    const tag = segment.split(';')[0]?.trim().slice(0, 2).toLowerCase()
    if (tag && isSupportedLocale(tag)) return tag
  }

  return DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPayloadRoute =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')

  if (isPayloadRoute) return NextResponse.next()

  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (!pathnameHasLocale) {
    const locale = detectLocale(request)
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}${pathname}`

    const response = NextResponse.rewrite(url)
    response.headers.set('x-pathname', url.pathname)
    return response
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
