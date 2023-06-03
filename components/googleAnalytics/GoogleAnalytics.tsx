"use client";
import React from "react";
import Script from "next/script";

import { useAnalytics } from "@/hooks/useAnalytics";

const GoogleAnalytics = () => {
  useAnalytics();
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
              page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
