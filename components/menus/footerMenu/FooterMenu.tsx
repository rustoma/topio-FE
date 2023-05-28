import React from "react";
import Link from "next/link";

import "./footerMenu.style.scss";

const FOOTER_LINKS = {
  home: "/",
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
      </ul>
    </div>
  );
};
