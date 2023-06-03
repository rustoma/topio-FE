"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { pageView } from "@/lib/gtagHelper";

export const useAnalytics = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathName + searchParams.toString();

    pageView(process.env.NEXT_PUBLIC_GA_TRACKING_ID ?? "", url);
  }, [pathName, searchParams]);
};
