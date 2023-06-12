import { notFound } from "next/navigation";

import { Page, RelatedPages } from "@/types/page";

export const getPageBySlug = async (slug: string): Promise<Page> => {
  const res = await fetch(`${process.env.BACKEND_HOST}/api/v1/pages?slug=/${slug}`, {
    headers: {
      "x-api-key": `Bearer ${process.env.API_KEY}`,
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
};

export const getAllSlugs = async (): Promise<{ slug: string }[]> => {
  const res = await fetch(`${process.env.BACKEND_HOST}/api/v1/pages/slug`, {
    cache: "no-store",
    headers: {
      "x-api-key": `Bearer ${process.env.API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getNewestRankings = async (): Promise<Page[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/v1/pages?orderBy=updated_at&direction=DESC`, {
    headers: {
      "x-api-key": `Bearer ${process.env.API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getPageByCategories = async (): Promise<{ category_name: string; pages: Page[] }[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/v1/pages?groupBy=categories`, {
    headers: {
      "x-api-key": `Bearer ${process.env.API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getRelatedPagesBasedOnProductCategory = async (productCategoryId: number): Promise<RelatedPages[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/v1/pages?product-category=${productCategoryId}`,
    {
      headers: {
        "x-api-key": `Bearer ${process.env.API_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
