import React from "react";
import clsx from "clsx";

import { MenuItem } from "@/components/menus/mainMenu/menuItem/MenuItem";
import { MenuLink } from "@/types/menu";

import "./menuDropdown.style.scss";

interface DropdownProps {
  submenus: MenuLink[];
  dropdown: boolean;
  depthLevel: number;
  classes?: {
    listDeep?: string;
    listItem?: string;
    menuLink?: string;
    menuDeepLink?: string;
  };
}

export const MenuDropdown = ({ submenus, dropdown, depthLevel, classes }: DropdownProps) => {
  depthLevel = depthLevel + 1;
  return (
    <ul
      className={clsx(
        "main-menu__dropdown",
        depthLevel > 1 && "main-menu__dropdown--deep",
        classes?.listDeep,
        dropdown && "main-menu__dropdown--visible",
        dropdown && depthLevel === 1 && "main-menu__dropdown--flat-animation",
        dropdown && depthLevel > 1 && "main-menu__dropdown--deep-animation"
      )}>
      {submenus.map((submenu) => (
        <MenuItem menuItem={submenu} key={submenu.id} depthLevel={depthLevel} classes={classes} />
      ))}
    </ul>
  );
};
