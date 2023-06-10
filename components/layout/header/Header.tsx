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
                id: "Ekspresy do kawy",
                title: "Ekspresy do kawy",
                items: [
                  {
                    id: "Ranking ekspresów do kawy",
                    title: "Ranking ekspresów do kawy",
                    url: "/ranking-ekspresow-do-kawy",
                    items: [],
                  },
                  {
                    id: "Ranking ekspresów do kawy do 2000 zł",
                    title: "Ranking ekspresów do kawy do 2000 zł",
                    url: "/ranking-ekspresow-do-kawy-do-2000",
                    items: [],
                  },
                ],
              },
              {
                id: "Drukarki",
                title: "Drukarki",
                items: [
                  {
                    id: "Ranking drukarek",
                    title: "Ranking drukarek",
                    url: "/ranking-drukarek",
                    items: [],
                  },
                  {
                    id: "Ranking drukarek laserowych",
                    title: "Ranking drukarek laserowych",
                    url: "/ranking-drukarek-laserowych",
                    items: [],
                  },
                  {
                    id: "Ranking drukarek atramentowych",
                    title: "Ranking drukarek atramentowych",
                    url: "/ranking-drukarek-atramentowych",
                    items: [],
                  },
                ],
              },
              {
                id: "Żelazka",
                title: "Żelazka",
                items: [
                  {
                    id: "Ranking żelazek",
                    title: "Ranking żelazek",
                    url: "/ranking-zelazek",
                    items: [],
                  },
                  {
                    id: "Ranking żelazek parowych",
                    title: "Ranking żelazek parowych",
                    url: "/ranking-zelazek-parowych",
                    items: [],
                  },
                  {
                    id: "Ranking żelazek do 300 zł",
                    title: "Ranking żelazek do 300 zł",
                    url: "/ranking-zelazek-do-300-zl",
                    items: [],
                  },
                ],
              },
              {
                id: "Zmywarki",
                title: "Zmywarki",
                items: [
                  {
                    id: "Ranking zmywarek",
                    title: "Ranking zmywarek",
                    url: "/ranking-zmywarek",
                    items: [],
                  },
                  {
                    id: "Ranking zmywarek do zabudowy",
                    title: "Ranking zmywarek do zabudowy",
                    url: "/ranking-zmywarek-do-zabudowy",
                    items: [],
                  },
                ],
              },
              {
                id: "Wszystkie rankingi",
                title: "Wszystkie rankingi",
                items: menu,
              },
              ...MENU_TREE,
            ]}
          />
          <HamburgerMenu menuTree={[...menu, ...MENU_TREE]} />
        </div>
      </Container>
    </header>
  );
};
