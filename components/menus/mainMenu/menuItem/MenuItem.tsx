"use client";
import React, { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MenuDropdown } from "@/components/menus/mainMenu/menuDropdown/MenuDropdown";
import { MenuLink } from "@/components/menus/mainMenu/menuLink/MenuLink";
import { MenuLink as MenuLinkT } from "@/types/menu";

import "./menuItem.style.scss";

interface MenuItemProps {
  menuItem: MenuLinkT;
  depthLevel: number;
  classes?: {
    listDeep?: string;
    listItem?: string;
    menuLink?: string;
    menuDeepLink?: string;
  };
}

export const MenuItem = ({ menuItem, depthLevel, classes }: MenuItemProps) => {
  const pathName = usePathname();
  const [dropdown, setDropdown] = useState(false);

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const closeDropdown = () => {
    if (dropdown) {
      setDropdown(false);
    }
  };

  return (
    <li
      className={clsx("main-menu__item", classes?.listItem)}
      onClick={closeDropdown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {menuItem.items ? (
        <>
          <MenuLink
            menuLink={menuItem}
            dropdown={dropdown}
            depthLevel={depthLevel}
            classes={{
              menuLink: classes?.menuLink,
              menuDeepLink: classes?.menuDeepLink,
            }}
          />

          <MenuDropdown submenus={menuItem.items} dropdown={dropdown} depthLevel={depthLevel} classes={classes} />
        </>
      ) : !menuItem.url ? (
        <span
          className={clsx(
            "main-menu__link main-menu__link--no-url",
            classes?.menuLink,
            depthLevel > 0 && "main-menu__link--deep"
          )}
          tabIndex={0}>
          {menuItem.title}
        </span>
      ) : (
        <Link
          href={menuItem.url}
          className={clsx(
            "main-menu__link",
            depthLevel < 1 && "menu__link-flat",
            depthLevel > 0 && "menu__link--deep",
            depthLevel > 0 && classes?.menuLink,

            classes?.menuLink,
            pathName === menuItem.url && "menu__link--active"
          )}>
          {menuItem.title}
        </Link>
      )}
    </li>
  );
};
