"use client";
import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/container/Container";
import { MainLogo } from "@/components/logos/MainLogo";
import { MainMenu } from "@/components/menus/mainMenu/MainMenu";
import { HamburgerMenu } from "@/components/menus/mobileMenu/hamburgerMenu/HamburgerMenu";
import { MenuLink } from "@/types/menu";

import "./header.style.scss";

const MENU_TREE: MenuLink[] = [
  {
    id: "kontakt-page",
    title: "Kontakt",
    url: "/kontakt",
    items: [],
  },
];

interface HeaderProps {
  menu: MenuLink[];
}

export const Header = ({ menu }: HeaderProps) => {
  const pathName = usePathname();

  return (
    <header className={clsx("main-header", pathName === "/" ? "main-header--primary" : "main-header--secondary")}>
      <Container className="main-header__container">
        <div className="main-header__content-wrapper">
          <Link href="/" className="main-logo__link">
            <MainLogo className="main-logo__icon--header" />
          </Link>
          <MainMenu
            menuTree={[
              {
                id: "Wszystkie rankingi",
                title: "Wszystkie rankingi",
                items: menu,
              },
              ...MENU_TREE,
            ]}
          />
          <HamburgerMenu
            menuTree={[
              {
                id: "Wszystkie rankingi",
                title: "Wszystkie rankingi",
                items: menu,
              },
              ...MENU_TREE,
            ]}
          />
        </div>
      </Container>
    </header>
  );
};
