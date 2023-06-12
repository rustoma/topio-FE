import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getMEXRedirects } from "@/services/redirect";

export async function middleware(request: NextRequest) {
  const redirects = await getMEXRedirects();
  const url = request.nextUrl;

  for (const redirect of redirects) {
    if (redirect.source === url.pathname) {
      url.href = redirect.destination;

      const params = new URLSearchParams(url.searchParams); // Extract search parameters

      // @ts-ignore
      const sortedParams = [...params.entries()].sort(([keyA], [keyB]) => {
        if (keyA === "p") {
          return -1;
        } else if (keyB === "p") {
          return 1;
        } else {
          return 0;
        }
      });

      const sortedSearchParams = new URLSearchParams(sortedParams);

      url.search = "?" + sortedSearchParams.toString();
      url.searchParams.sort();
      console.log(url.search);
      console.log(url.searchParams);

      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/sklep/:path*",
};
