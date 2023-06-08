import { notFound } from "next/navigation";

import { Page } from "@/types/page";

export const getPageBySlug = async (slug: string): Promise<Page> => {
  const res = await fetch(`${process.env.BACKEND_HOST}/page/${slug}`, {
    referrer: process.env.NEXT_PUBLIC_FRONTEND_HOST,
    referrerPolicy: "origin",
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
};

export const getAllSlugs = async (): Promise<{ slug: string }[]> => {
  const res = await fetch(`${process.env.BACKEND_HOST}/pages/slugs`, {
    cache: "no-store",
    referrer: process.env.NEXT_PUBLIC_FRONTEND_HOST,
    referrerPolicy: "origin",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getNewestRankings = async (): Promise<Page[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/rankings`, {
    referrer: process.env.NEXT_PUBLIC_FRONTEND_HOST,
    referrerPolicy: "origin",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getpageByCategories = async (): Promise<{ category_name: string; pages: Page[] }[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/page-by-categories`, {
    referrer: process.env.NEXT_PUBLIC_FRONTEND_HOST,
    referrerPolicy: "origin",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
