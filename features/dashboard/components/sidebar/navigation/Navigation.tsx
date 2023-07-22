import React from "react";

import NavigationItem from "@/features/dashboard/components/sidebar/navigation/NavigationItem";

import "./navigation.style.scss";

const LINKS = [
  { text: "Rankingi", href: "/dashboard/rankings" },
  { text: "Produkty", href: "/dashboard/products" },
  { text: "Kategorie", href: "/dashboard/categories" },
];

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {LINKS.map((link) => (
          <NavigationItem key={link.href + link.text} text={link.text} href={link.href} />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
