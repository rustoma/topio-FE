import React from "react";
import Link from "next/link";

import { Container } from "@/components/container/Container";
import { MainLogo } from "@/components/logos/MainLogo";
import { FooterMenu } from "@/components/menus/footerMenu/FooterMenu";

import "./footer.style.scss";

export const Footer = () => {
  return (
    <footer className="main-footer">
      <Container>
        <div className="main-footer__content-wrapper">
          <div className="main-footer__column">
            <FooterMenu />
          </div>
          <div className="main-footer__column">
            <Link href="/" className="main-logo__link">
              <MainLogo className="main-logo__icon--footer" />
            </Link>
            <p className="main-footer__paragraph">Serwis topio.pl to rzetelny ranking produktów.</p>
            <p className="main-footer__paragraph">
              Dzięki zawartym w nim recenzją i poradą pomagamy w wyborze produktu przed potencjalnym zakupem.
            </p>
          </div>
          <div className="main-footer__column">
            <p className="main-footer__paragraph">
              Serwis topio.pl bazuje na ogólnodostępnych informacjach w internecie.
            </p>
            <div className="main-footer__design-by">
              <p className="main-footer__design-by-label">
                Designed
                <span className="main-footer__design-by-label-suffix">By TR</span>
              </p>
            </div>
          </div>
        </div>
        <p className="main-footer__rights">{`topio.pl © ${new Date().getFullYear()} All Rights Reserved`}</p>
      </Container>
    </footer>
  );
};
