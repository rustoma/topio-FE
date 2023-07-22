import React, { ReactElement, useEffect, useState } from "react";

import Dropdown, { DropdownBaseProps } from "@/features/dashboard/components/dropdown/Dropdown";

interface UseDropdownListArgs<T> {
  options: T[];
  currentSelectedValue?: DropdownListSelectOption["value"];
  onItemSelect?: (option: T) => void;
}
export interface DropdownListOption {
  label: string | ReactElement;
  labelEnd?: string | ReactElement;
  disabled?: boolean;
  value?: unknown;
  href?: string;
  linkAttributes?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  onClick?: () => void;
  [key: string]: unknown;
}
export interface DropdownListSelectOption extends DropdownListOption {
  value: string;
  href?: never;
  linkAttributes?: never;
}
export interface DropdownListLinksOption extends DropdownListOption {
  href: string;
}

const registerClosedDropdownHandlers = ({ setIsDropdownOpen }: { setIsDropdownOpen: any }) => {
  const keyDownCallback = (e: any) => {
    switch (e.key) {
      case "Up":
      case "ArrowUp":
      case "Down":
      case "ArrowDown":
      case " ":
      case "Enter":
        e.preventDefault();
        setIsDropdownOpen(true);
    }
  };
  document.addEventListener("keydown", keyDownCallback);
  return () => {
    document.removeEventListener("keydown", keyDownCallback);
  };
};

const registerOpenDropdownHandlers = ({
  options,
  optionsLength,
  activeIndex,
  setActiveIndex,
  select,
  setIsOpen,
}: {
  options: DropdownListOption[];
  optionsLength: number;
  activeIndex: number;
  setActiveIndex: any;
  select?: any;
  setIsOpen: (value: boolean) => void;
}) => {
  const keyDownCallback = (e: any) => {
    e.preventDefault();
    switch (e.key) {
      case "Up":
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(activeIndex <= 0 ? optionsLength - 1 : activeIndex - 1);
        return;
      case "Down":
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex(activeIndex + 1 === optionsLength ? 0 : activeIndex + 1);
        return;
      case "Enter":
      case " ": // Space
        e.preventDefault();
        if (options[activeIndex].disabled) {
          return;
        }

        return select && select(options[activeIndex]);

      case "Esc":
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        return;
      case "PageUp":
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        return;
      case "PageDown":
      case "End":
        e.preventDefault();
        setActiveIndex(options.length - 1);
        return;
    }
  };
  document.addEventListener("keydown", keyDownCallback);
  return () => {
    document.removeEventListener("keydown", keyDownCallback);
  };
};

export const useDropdownList = <T extends DropdownListOption = DropdownListOption>({
  options,
  currentSelectedValue,
  onItemSelect,
}: UseDropdownListArgs<T>) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownTriggerFocus, setIsDropdownTriggerFocus] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const setIsDropdownInternal = (v: boolean) => {
    if (v) {
      const selected = options.findIndex((o) => o.value === currentSelectedValue);
      setActiveIndex(selected < 0 ? 0 : selected);
    }
    setIsDropdownOpen(v);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      return registerOpenDropdownHandlers({
        options,
        activeIndex,
        setActiveIndex,
        optionsLength: options.length,
        select: onItemSelect,
        setIsOpen: setIsDropdownOpen,
      });
    }

    if (!isDropdownOpen && isDropdownTriggerFocus) {
      return registerClosedDropdownHandlers({
        setIsDropdownOpen: setIsDropdownInternal,
      });
    }
    //Dropdown handlers do not depend on change options, select and setIsDropdownOpen, so eslint is disabled
  }, [isDropdownOpen, activeIndex, isDropdownTriggerFocus]);  

  return {
    isDropdownOpen,
    activeIndex,
    setIsDropdownOpen,
    setActiveIndex,
    setIsDropdownTriggerFocus,
  };
};

const DropdownList = ({
  children,
  isOpen,
  triggerId,
  placement = "bottom-start",
  fit,
  onClickOutside,
}: DropdownBaseProps) => {
  return (
    <Dropdown
      fit={fit}
      isOpen={isOpen}
      dropdownContainer="ul"
      aria-multiselectable={false}
      role="listbox"
      triggerId={triggerId}
      placement={placement}
      onClickOutside={onClickOutside}>
      {children}
    </Dropdown>
  );
};

export default DropdownList;
