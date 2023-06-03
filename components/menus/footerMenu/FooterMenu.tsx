import React from "react";
import Link from "next/link";

import "./footerMenu.style.scss";

const FOOTER_LINKS = {
  home: "/",
  kontakt: "/kontakt",
  policy: "/polityka-prywatnosci-i-cookies",
  regulations: "/regulamin",
};

export const FooterMenu = () => {
  return (
    <div className="footer-menu">
      <h3 className="footer-menu__title">Linki</h3>
      <ul className="footer-menu__list">
        <li className="footer-menu__list-item">
          <Link href={FOOTER_LINKS.home} className="footer-menu__link">
            Home
          </Link>
        </li>
        <li className="footer-menu__list-item">
          <Link href={FOOTER_LINKS.policy} className="footer-menu__link">
            Polityka prywatności i cookies
          </Link>
        </li>
        <li className="footer-menu__list-item">
          <Link href={FOOTER_LINKS.regulations} className="footer-menu__link">
            Regulamin
          </Link>
        </li>
        <li className="footer-menu__list-item">
          <Link href={FOOTER_LINKS.kontakt} className="footer-menu__link">
            Kontakt
          </Link>
        </li>
      </ul>
    </div>
  );
};
