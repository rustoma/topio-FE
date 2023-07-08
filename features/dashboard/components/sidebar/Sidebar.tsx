import React from "react";
import Link from "next/link";

import { MainLogo } from "@/components/logos/MainLogo";
import Navigation from "@/features/dashboard/components/sidebar/navigation/Navigation";

import "./sidebar.style.scss";

export const SideBar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <Link href="/dashboard" className="sidebar__logo-link">
          <MainLogo />
        </Link>
      </div>
      <Navigation />
    </aside>
  );
};
