import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextRequest, NextResponse } from "next/server"

const protectedRoutes = ['/account']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const session = await supabase.auth.getSession()

  // Check if user is trying to access protected routes
  const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname)
  // Redirect if the user is not authenticated and trying to access a protected route
  if (isProtectedRoute && !session.data.session) {
    // New in NextJs13
    const url = req.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return res
}