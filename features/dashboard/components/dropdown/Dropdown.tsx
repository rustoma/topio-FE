import React, { ComponentPropsWithoutRef, createElement, ElementType, ReactNode, useId } from "react";
import clsx from "clsx";

import useClickOutside, { useClickOutsidePropsI } from "@/hooks/useClickOutside";

import "./dropdown.style.scss";

export type DropdownBaseProps = {
  children: ReactNode;
  isOpen: boolean;
  triggerId?: string;
  placement?:
    | "top-start"
    | "top"
    | "top-end"
    | "bottom-start"
    | "bottom"
    | "bottom-end"
    | "right-start"
    | "right"
    | "right-end"
    | "left-start"
    | "left"
    | "left-end";
  fit?: boolean;
  onClickOutside?: useClickOutsidePropsI;
};

type DropdownProps<T extends ElementType> = {
  dropdownContainer?: T;
} & ComponentPropsWithoutRef<T> &
  DropdownBaseProps;

const Dropdown = <T extends ElementType = "div">({
  children,
  isOpen,
  triggerId,
  placement = "bottom-start",
  fit,
  onClickOutside,
  dropdownContainer,
  ...rest
}: DropdownProps<T>) => {
  console.log({ placement });
  const dropdownId = useId();

  const ref = useClickOutside({ callback: onClickOutside?.callback, exceptRef: onClickOutside?.exceptRef });

  return isOpen
    ? createElement(
        dropdownContainer || "div",
        {
          className: clsx(isOpen && "dropdown", !isOpen && "dropdown--close", fit && "dropdown--fit"),
          tabIndex: -1,
          id: `${triggerId ?? dropdownId}_dropdown`,
          ref,
          ...rest,
        },
        <>{children}</>
      )
    : null;
};

export default Dropdown;
