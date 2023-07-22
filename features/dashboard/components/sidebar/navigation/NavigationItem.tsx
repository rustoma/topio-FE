import React from "react";
import Link from "next/link";

import "./navigationItem.style.scss";

interface NavigationItemProps {
  text: string;
  href: string;
}

const NavigationItem = ({ text, href }: NavigationItemProps) => (
  <li>
    <Link href={href} className="navigation__item">
      {text}
    </Link>
  </li>
);

export default NavigationItem;
