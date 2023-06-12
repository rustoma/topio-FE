import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { format,parse } from "url";

import { getMEXRedirects } from "@/services/redirect";

export async function middleware(request: NextRequest) {
  const redirects = await getMEXRedirects();
  const url = request.nextUrl;

  for (const redirect of redirects) {
    if (redirect.source === url.pathname) {
      const redirectUrl = new URL(redirect.destination, request.url);

      // Sort the query parameters manually
      const params = parse(redirectUrl.search, true).query;
      const sortedParams = {
        p: params.p,
        a: params.a,
        ...params,
      };

      const queryString = format({ query: sortedParams });

      // Create a new URL with the sorted query string
      const finalUrl = new URL(redirectUrl.origin + redirectUrl.pathname + queryString);

      return NextResponse.redirect(finalUrl);

      // return NextResponse.redirect(new URL(redirect.destination, request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/sklep/:path*",
};
