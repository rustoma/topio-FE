import * as React from "react";
import { Metadata } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

import RankPage from "@/components/rankPage/RankPage";
import { getAllSlugs, getPageBySlug, getRelatedPagesBasedOnProductCategory } from "@/services/page";

export async function generateStaticParams() {
  const pages = await getAllSlugs();

  const slugsForPages = pages.map((page) => ({
    slug: page.slug.split("/").slice(1),
  }));

  return [...slugsForPages];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = params;
  const slugString = slug.join("/");
  const page = await getPageBySlug(slugString);

  return {
    title: `${page.title} | ${new Date().getFullYear()} topio.pl`,
    description: undefined,
    alternates: {
      canonical: `${process.env.FRONTEND_HOST}${page.slug}`,
    },
    openGraph: {
      images: "/topio-social.jpg",
    },
  };
}
export default async function NodePage({ params }: { params: Params }) {
  const { slug } = params;
  const slugString = slug.join("/");
  const page = await getPageBySlug(slugString);

  if (!page) {
    notFound();
  }

  const relatedPages = await getRelatedPagesBasedOnProductCategory(page.product_category);

  return (
    <RankPage
      id={page.id}
      title={page.title}
      intro={page.intro}
      body={page.body}
      CreatedAt={page.created_at?.toString() ?? "2022-01-01"}
      UpdatedAt={page.updated_at?.toString() ?? "2022-01-01"}
      products={page.products ?? []}
      relatedPages={relatedPages}
    />
  );
}
