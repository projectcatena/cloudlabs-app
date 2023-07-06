import { NextRequest, NextResponse } from "next/server";
import authService, { checkLoggedIn } from "./services/auth.service";

export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let token = request.cookies.get('jwt');

  console.log(token);

  if (token != null) {
    const authStatus = checkLoggedIn(authService.Roles.user.toString(), token.value);
    if (authStatus) {
      // Clone the request headers and set a new header `x-hello-from-middleware1`
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('Authorization', 'Bearer ' + token.value);
      requestHeaders.set('Access-Control-Allow-Origin', "*");
      requestHeaders.set('Access-Control-Allow-Headers', "*");

      // You can also set request headers in NextResponse.rewrite
      const response = NextResponse.next({
        request: {
          // New request headers
          headers: requestHeaders,
        },
      })


      return response;
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
