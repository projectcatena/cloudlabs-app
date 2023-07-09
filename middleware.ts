import { NextRequest, NextResponse } from "next/server";
import { ROLES, checkLoggedIn } from "./services/auth.service";

export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let token = request.cookies.get('jwt');

  console.log(token);

  if (token != null) {
    const authStatus = checkLoggedIn(ROLES.USER, token.value);
    if (authStatus) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: [
    /*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 */
    '/((?!login|signup|$|admin/*|_next/static|_next/image|favicon.ico|ICT.jpg).*)',
  ],
}
