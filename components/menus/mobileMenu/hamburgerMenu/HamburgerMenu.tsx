"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { HamburgerButton } from "@/components/menus/mobileMenu/hamburgerButton/HamburgerButton";
import { MobileMenu } from "@/components/menus/mobileMenu/MobileMenu";
import { MenuLink } from "@/types/menu";

import "./hamburgerMenu.style.scss";

interface HamburgerMenuProps {
  menuTree: MenuLink[];
}

export const HamburgerMenu = ({ menuTree }: HamburgerMenuProps) => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  return (
    <div className={clsx("hamburger-menu", isOpen && "hamburger-menu--open")}>
      <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <nav className={clsx("hamburger-menu__navigation", isOpen && "hamburger-menu__navigation--open")}>
        <MobileMenu menuTree={menuTree} isOpen={isOpen} />
      </nav>
    </div>
  );
};
