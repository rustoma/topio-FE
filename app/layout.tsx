import React, { ReactNode, Suspense } from "react";
import { Bebas_Neue, Oxygen } from "next/font/google"; // eslint-disable-line

import CookieBanner from "@/components/cookieBanner/CookieBanner";
import GoogleAnalytics from "@/components/googleAnalytics/GoogleAnalytics";
import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";
import { WindowDimensionsProvider } from "@/context/WindowDimensionsContext";
import { getRankingsMenu } from "@/services/menu";

import "./globals.scss";

const oxygen = Oxygen({
  weight: ["400", "700"],
  display: "swap",
  variable: "--theme-font-body",
  fallback: ["Helvetica", "sans-serif"],
  subsets: ["latin", "latin-ext"],
});

const bebas = Bebas_Neue({
  weight: ["400"],
  display: "swap",
  variable: "--theme-font-display",
  fallback: ["cursive"],
  subsets: ["latin", "latin-ext"],
});

export const metadata = {
  title: "Topio - najlepszy ranking produktów",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const menu = await getRankingsMenu();

  return (
    <WindowDimensionsProvider>
      <html lang="pl" className={`${oxygen.variable} ${bebas.variable} light`}>
        <body>
          <Header menu={menu} />
          {children}
          <Footer />
          <CookieBanner />
          <Suspense>
            <GoogleAnalytics />
          </Suspense>
        </body>
      </html>
    </WindowDimensionsProvider>
  );
};

export default RootLayout;
