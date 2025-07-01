import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in',
  '/sign-up',
  '/home'
])

const isPublicApiRoute = createRouteMatcher([
  '/api/videos',
])

export default clerkMiddleware(async( auth, req ) => {
  const { userId } = await auth()
  // console.log(userId)
  const pathname = req.nextUrl.pathname
  const isApiRequest = pathname.startsWith('/api')

  //  Redirect to /dashboard if logged in and visiting /sign-in or /sign-up
  if (userId && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  //  Redirect to /sign-in if NOT logged in and trying to access protected route
  if (!userId && !isPublicRoute(req) && !isPublicApiRoute(req)) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/',
    '/api/(.*)',
  ]
}
