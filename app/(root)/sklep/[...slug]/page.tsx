import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { redirect } from "next/navigation";

import { getMEXRedirects } from "@/services/redirect";

export default async function ShopPage({ params }: { params: Params }) {
  const redirects = await getMEXRedirects();
  const { slug } = params;
  const slugString = slug.join("/");

  for (const currentRedirect of redirects) {
    if (currentRedirect.source === "/sklep/" + slugString) {
      redirect(currentRedirect.destination);
    }
  }
}
