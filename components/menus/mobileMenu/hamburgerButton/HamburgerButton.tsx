import React from "react";
import clsx from "clsx";

import "./hamburgerButton.style.scss";

interface HamburgerButtonProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

export const HamburgerButton = ({ isOpen, setIsOpen }: HamburgerButtonProps) => {
  return (
    <div
      className={clsx("hamburger-menu__button", isOpen && "hamburger-menu__button--open")}
      onClick={() => setIsOpen((isOpen) => !isOpen)}>
      <div className="hamburger-menu__button-line-wrapper">
        <span
          className={clsx(
            "hamburger-menu__button-line",
            isOpen && "hamburger-menu__button-line--open-first hamburger-menu__button-line--open"
          )}
        />
        <span
          className={clsx(
            "hamburger-menu__button-line",
            !isOpen && "hamburger-menu__button-line--second",
            isOpen && "hamburger-menu__button-line--open-second hamburger-menu__button-line--open"
          )}
        />
      </div>
    </div>
  );
};
