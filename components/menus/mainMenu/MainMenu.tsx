"use client";
import React from "react";
import Link from "next/link";

import "./mainMenu.style.scss";

const PAGE_LINKS = {
  home: "/",
};

export const MainMenu = () => {
  return (
    <ul className="main-menu">
      <li className="main-menu__list">
        <Link href={PAGE_LINKS.home} className="main-menu__link">
          Home
        </Link>
      </li>
    </ul>
  );
};
