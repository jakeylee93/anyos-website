import { NextRequest, NextResponse } from 'next/server'

const SITE_PIN = '7492'
const COOKIE_NAME = 'anyos-auth'
const COOKIE_VALUE = 'authenticated'

export function middleware(request: NextRequest) {
  // Allow the auth API route and public proposal pages through
  if (
    request.nextUrl.pathname === '/api/auth' ||
    request.nextUrl.pathname.startsWith('/pukkapadelproposal')
  ) {
    return NextResponse.next()
  }

  // Allow static assets through
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/favicon') ||
    request.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2)$/)
  ) {
    return NextResponse.next()
  }

  // Check for auth cookie
  const authCookie = request.cookies.get(COOKIE_NAME)
  if (authCookie?.value === COOKIE_VALUE) {
    return NextResponse.next()
  }

  // Redirect to gate page
  if (request.nextUrl.pathname !== '/gate') {
    return NextResponse.redirect(new URL('/gate', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
