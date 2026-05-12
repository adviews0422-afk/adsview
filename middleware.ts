import { NextAuthMiddlewareOptions, withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

// Redis setup
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
})

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth
    const { pathname } = req.nextUrl

    if (pathname.startsWith('/dashboard') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }

    if (pathname.startsWith('/api/register')) {
      const ip = req.headers.get('x-forwarded-for') || 'unknown'

      const { success } = await ratelimit.limit(ip)

      if (!success) {
        return new NextResponse('Too Many Requests', { status: 429 })
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  } as NextAuthMiddlewareOptions,
)

export const config = {
  matcher: ['/account/:path*', '/store/checkout/:path*', '/dashboard/:path*', '/api/register'],
}
