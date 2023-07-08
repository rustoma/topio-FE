import React, { ReactNode } from "react";

import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";
import { getRankingsMenu } from "@/services/menu";

const Layout = async ({ children }: { children: ReactNode }) => {
  const menu = await getRankingsMenu();

  return (
    <>
      <Header menu={menu} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
