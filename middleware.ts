import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { apiAuthPrefix, authRoutes, DEFAULT_REDIRECT_AFTER_LOGIN, publicRoutes } from "./routes";

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow by pass every single api auth route, for instance I want "api/auth/providers" to check json auth configuration
  if (isApiAuthRoute) {
    return null
    // Let NextAuth handle its own routes
  }

  if (isAuthRoute) {
    // If user already loggedin => redirect them to /settings
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT_AFTER_LOGIN, nextUrl))
    }

    // Otherwise does nothing, just let them do register or login!
    return null;
  }

  // User not logged in yet and not at a public route
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl))
  }

  // allow all other routes
  return null
})

// Optionally, don't invoke Middleware on some paths
// Execute middleware on every single routes EXCEPT `_next` static files and images
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}