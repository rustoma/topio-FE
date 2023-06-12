import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getMEXRedirects } from "@/services/redirect";

export async function middleware(request: NextRequest) {
  const redirects = await getMEXRedirects();
  const url = request.nextUrl;

  for (const redirect of redirects) {
    if (redirect.source === url.pathname) {
      url.href = redirect.destination;

      return NextResponse.redirect(new URL(redirect.destination, request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/sklep/:path*",
};
