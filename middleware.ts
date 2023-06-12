import { NextRequest, NextResponse } from "next/server";

import { getMEXRedirects } from "@/services/redirect";

export async function middleware(request: NextRequest) {
  const redirects = await getMEXRedirects();
  const url = request.nextUrl;

  for (const redirect of redirects) {
    if (redirect.source === url.pathname) {
      url.href = redirect.destination;
      url.searchParams.sort();

      return NextResponse.redirect(
        "https://www.mediaexpert.pl/agd-male/sprzatanie/odkurzacze-pionowe?a=818182&url=https://mediaexpert.pl"
      );
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: "/sklep/:path*",
};
