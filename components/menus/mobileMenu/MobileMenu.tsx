import React from "react";
import clsx from "clsx";

import { MobileMenuItem } from "@/components/menus/mobileMenu/mobileMenuItem/MobileMenuItem";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { MenuLink } from "@/types/menu";

import "./mobileMenu.style.scss";

interface MobileMenuProps {
  menuTree: MenuLink[];
  className?: string;
  level?: number;
  isSubMenuOpen?: boolean;
  updateParentMenuMaxHeight?: (height: number) => void;
  isOpen: boolean;
}

export const MobileMenu = ({
  menuTree,
  className,
  isOpen,
  isSubMenuOpen = false,
  updateParentMenuMaxHeight,
  level = 0,
}: MobileMenuProps) => {
  const { menuRef, openMenu, setOpenMenu, updateMaxHeight } = useMobileMenu({
    isSubMenuOpen,
    level,
    updateParentMenuMaxHeight,
    isOpen,
  });

  if (menuTree.length < 1) return null;

  return (
    <ul className={clsx(`mobile-menu mobile-menu__level-${level}`, className && className)} ref={menuRef}>
      {menuTree.map((menuItem) => {
        return (
          <MobileMenuItem
            key={menuItem.id}
            menuItem={menuItem}
            openMenu={setOpenMenu}
            isOpen={openMenu[menuItem.title]}>
            {menuItem.items && menuItem.items.length > 0 && (
              <MobileMenu
                menuTree={menuItem.items ?? []}
                level={level + 1}
                className="mobile-menu--expanded"
                isSubMenuOpen={openMenu[menuItem.title]}
                updateParentMenuMaxHeight={updateMaxHeight}
                isOpen={isOpen}
              />
            )}
          </MobileMenuItem>
        );
      })}
    </ul>
  );
};
