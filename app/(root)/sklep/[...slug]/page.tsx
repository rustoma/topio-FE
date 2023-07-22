import { Metadata } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { redirect } from "next/navigation";

import { getMEXRedirects } from "@/services/redirect";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = params;

  const lastPartOfSlug = slug[slug.length - 1];

  const productNameArray = lastPartOfSlug.split("-");
  productNameArray.pop();

  const string = productNameArray.join(" ");

  const productName = string.replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase());

  return {
    title: `${productName} | ${new Date().getFullYear()} topio.pl`,
    robots: "nofollow, noindex",
    description: undefined,
    alternates: {
      canonical: `${process.env.FRONTEND_HOST}/sklep/${lastPartOfSlug}`,
    },
    openGraph: {
      images: "/topio-social.jpg",
    },
  };
}

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
