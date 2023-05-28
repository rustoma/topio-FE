import React from "react";
import Link from "next/link";

import { Container } from "@/components/container/Container";
import { MainLogo } from "@/components/logos/MainLogo";
import { MainMenu } from "@/components/menus/mainMenu/MainMenu";

import "./header.style.scss";

interface HeaderProps {
  type?: "primary" | "secondary";
}

export const Header = ({ type = "secondary" }: HeaderProps) => {
  return (
    <header className={`main-header main-header--${type}`}>
      <Container className="main-header__container">
        <div className="main-header__content-wrapper">
          <Link href="/" className="main-logo__link">
            <MainLogo className="main-logo__icon--header" />
          </Link>
          <MainMenu />
        </div>
      </Container>
    </header>
  );
};
