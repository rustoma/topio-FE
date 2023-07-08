import React, { ReactNode } from "react";

export const metadata = {
  title: "Dashboard - Topio",
};

const Layout = async ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default Layout;
