import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MenuLink as MenuLinkT } from "@/types/menu";

import "./menuLink.style.scss";

interface MenuLinkProps {
  menuLink: MenuLinkT;
  dropdown: boolean;
  depthLevel: number;
  classes?: {
    menuLink?: string;
    menuDeepLink?: string;
  };
}

export const MenuLink = ({ menuLink, dropdown, depthLevel, classes }: MenuLinkProps) => {
  const pathName = usePathname();

  return (
    <>
      {menuLink.url ? (
        <Link
          href={menuLink.url}
          role="button"
          aria-haspopup="menu"
          aria-expanded={dropdown ? "true" : "false"}
          className={clsx(
            "main-menu__link",
            depthLevel > 0 && "main-menu__link--deep",
            depthLevel > 0 && classes?.menuDeepLink,
            classes?.menuLink,
            pathName === menuLink.url && "main-menu__link--active"
          )}>
          {menuLink.title}
        </Link>
      ) : (
        <span
          className={clsx(
            "main-menu__link main-menu__link--no-url",
            classes?.menuLink,
            depthLevel > 0 && "main-menu__link--deep"
          )}
          role="button"
          aria-haspopup="menu"
          aria-expanded={dropdown ? "true" : "false"}
          tabIndex={0}>
          {menuLink.title}
        </span>
      )}
    </>
  );
};
