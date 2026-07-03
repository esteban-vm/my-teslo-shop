import type { Route } from 'next'
import type { NextProxy } from 'next/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from './auth'

export const proxy: NextProxy = async (request) => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    return NextResponse.redirect(new URL('/auth/login' satisfies Route, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/checkout/:path*', '/orders/:path*'],
}
