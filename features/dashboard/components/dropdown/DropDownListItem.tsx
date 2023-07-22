import React from "react";
import clsx from "clsx";
import Link from "next/link";

import { DropdownListOption } from "@/features/dashboard/components/dropdown/DropdownList";

import "./dropDownListItem.style.scss";

interface DropDownListItemProps<T> {
  id?: string;
  item: T;
  isHighlighted?: boolean;
  isSelected?: boolean;
  onMouseOver?: () => void;
  onClick?: (option: T) => void;
}

const DropDownListItem = <T extends DropdownListOption = DropdownListOption>({
  id,
  item,
  isHighlighted,
  isSelected,
  onMouseOver,
  onClick,
}: DropDownListItemProps<T>) => {
  return (
    <li
      id={id}
      aria-selected={isSelected}
      role="option"
      tabIndex={item.href ? -1 : 0}
      onMouseOver={onMouseOver}
      onClick={item.disabled ? () => undefined : onClick ? () => onClick(item) : undefined}
      className={clsx(
        "dropdown__list-item",
        isSelected && "dropdown__list-item--selected",
        isHighlighted && "dropdown__list-item--highlighted"
      )}>
      <>
        {item.href && <DropDownListItem.Link item={item} disabled={item.disabled} onClick={onClick} />}
        {!item.href && <DropDownListItem.Default disabled={item.disabled} item={item} />}
      </>
    </li>
  );
};

const LinkItem = <T extends DropdownListOption>({
  item,
  onClick,
  disabled = false,
}: {
  item: T;
  onClick?: (option: T) => void;
  disabled?: boolean;
}) => {
  return (
    <Link href={item.href ?? ""}>
      <a
        {...item.linkAttributes}
        className={clsx("full-width", disabled && "")}
        onClick={(e) => {
          if (onClick || disabled) {
            e.preventDefault();
          }
        }}>
        <div className="full-width">
          <div className="dropdown__list-item--truncate">{item.label}</div>
        </div>
      </a>
    </Link>
  );
};

const DefaultItem = ({ item, disabled = false }: { item: DropdownListOption; disabled?: boolean }) => {
  return (
    <div className={clsx("full-width", disabled && "")}>
      <div className="full-width">
        <div className="dropdown__list-item--truncate">{item.label}</div>
      </div>
    </div>
  );
};

DropDownListItem.Link = LinkItem;
DropDownListItem.Default = DefaultItem;

export default DropDownListItem;
