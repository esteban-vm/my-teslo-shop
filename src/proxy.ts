import type { Route } from 'next'
import type { NextProxy } from 'next/server'
import { NextResponse } from 'next/server'
import { getSession } from './lib/auth'

export const proxy: NextProxy = async (request) => {
  const session = await getSession()

  if (!session) {
    return NextResponse.redirect(new URL('/auth/sign-in' satisfies Route, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/checkout/:path*', '/orders/:path*', '/profile/:path*', '/admin/:path*'],
}
