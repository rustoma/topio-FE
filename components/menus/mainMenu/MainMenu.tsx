import React from "react";
import clsx from "clsx";

import { MenuItem } from "@/components/menus/mainMenu/menuItem/MenuItem";
import { MenuLink } from "@/types/menu";

import "./mainMenu.style.scss";

interface MainMenuProps {
  menuTree: MenuLink[];
  classes?: {
    root?: string;
    list?: string;
    listDeep?: string;
    listItem?: string;
    menuLink?: string;
    menuDeepLink?: string;
  };
}

export const MainMenu = ({ menuTree, classes }: MainMenuProps) => {
  return (
    <nav className="main-menu">
      <ul className={clsx("main-menu__list", classes?.list)}>
        {menuTree.map((menuItem) => {
          const depthLevel = 0;
          return (
            <MenuItem
              menuItem={menuItem}
              key={menuItem.id}
              depthLevel={depthLevel}
              classes={{
                listDeep: classes?.listDeep,
                listItem: classes?.listItem,
                menuLink: classes?.menuLink,
                menuDeepLink: classes?.menuDeepLink,
              }}
            />
          );
        })}
      </ul>
    </nav>
  );
};
