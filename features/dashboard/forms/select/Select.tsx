import React, { ChangeEventHandler, isValidElement, ReactElement, useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";

import { Wrap } from "@/components/conditionalWrapper/Wrap";
import { ChevronDown } from "@/components/icons/ChevronDown";
import DropdownList, {
  DropdownListSelectOption,
  useDropdownList,
} from "@/features/dashboard/components/dropdown/DropdownList";
import DropDownListItem from "@/features/dashboard/components/dropdown/DropDownListItem";
import { useForwardRef } from "@/hooks/useForwardRef";

import "../input/input.style.scss";
import "./select.style.scss";

interface SelectProps extends Omit<React.ComponentPropsWithoutRef<"select">, "className" | "size"> {
  options: DropdownListSelectOption[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value?: string | number;
  disabled?: boolean;
  size?: "lg" | "md" | "sm";
  label?: string;
  required?: boolean;
  fit?: boolean;
  hint?: ReactElement | string | false;
  error?: boolean;
}

interface UseSelectArgs {
  onChange: any;
  options: DropdownListSelectOption[];
  forwardedRef: React.ForwardedRef<HTMLSelectElement>;
  value?: string | number;
}

export const useSelect = ({ onChange, options, forwardedRef, value }: UseSelectArgs) => {
  const selectId = useId();
  const inputRef = useRef<HTMLSelectElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const selectIconRef = useRef<HTMLDivElement | null>(null);
  const combinedRef = useForwardRef(forwardedRef, inputRef);

  const [, setAreRefsSet] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const select = (selectRef: React.MutableRefObject<HTMLSelectElement>) => (value: string) => {
    if (value && selectRef.current) {
      selectRef.current.value = value;
      const event = new Event("change", { bubbles: true });
      Object.defineProperty(event, "target", { writable: false, value: selectRef.current });
      onChange && onChange(event);
    }
  };

  const focusCustomSelect = (ref = buttonRef) => {
    if (ref?.current) {
      return ref.current.focus();
    }
  };

  const getSelectedOption = (value?: string | number, ref = combinedRef) => {
    if (value) {
      return options.find((o) => o.value === value);
    }

    if (ref?.current?.selectedIndex || ref?.current?.selectedIndex === 0) {
      return options.find((o) => o.value === ref.current.options[ref.current.selectedIndex]?.value);
    }
  };

  useEffect(() => {
    setAreRefsSet(true);
  }, []);

  return {
    selectId,
    selectRef: combinedRef,
    buttonRef,
    selectIconRef,
    isFocus,
    selectedItem: getSelectedOption(value),
    setIsFocus,
    focusCustomSelect,
    select,
  };
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, value, onChange, disabled, label, hint, required, size = "md", error, fit, ...rest }, forwardedRef) => {
    const { selectId, selectRef, buttonRef, selectIconRef, selectedItem, select, focusCustomSelect } = useSelect({
      onChange,
      options,
      forwardedRef,
      value,
    });

    const { activeIndex, isDropdownOpen, setIsDropdownOpen, setActiveIndex, setIsDropdownTriggerFocus } =
      useDropdownList({
        options,
        currentSelectedValue: selectedItem?.value,
        onItemSelect: (option) => {
          select(selectRef)(option.value);
          setIsDropdownOpen(false);
        },
      });

    const handleIconClick = (disabled = false) => {
      if (disabled) {
        return;
      }

      setIsDropdownOpen(!isDropdownOpen);
      focusCustomSelect();
    };

    return (
      <div className={clsx("select", fit && "full-width")}>
        <Wrap if={!label} with="label">
          <select
            id={selectId}
            ref={selectRef}
            className="select--hidden"
            onChange={disabled ? () => undefined : onChange}
            value={selectedItem?.value}
            {...rest}>
            {options.map(({ value }) => (
              <option key={value} value={value} />
            ))}
          </select>
        </Wrap>

        <div>
          {(label || required) && (
            <div className="input__label-wrapper">
              {label && (
                <label
                  className={clsx("input__label", error && "input__label--error")}
                  id={`${selectId}_label`}
                  htmlFor={selectId}
                  onClick={() => focusCustomSelect()}>
                  {label}
                </label>
              )}
              {required && <span className="input__label-required">Wymagane*</span>}
            </div>
          )}

          <div className="select__wrapper">
            <button
              ref={buttonRef}
              className={clsx("input", error && "input--error", fit && "full-width", "input--icon-end", "select__root")}
              role="combobox"
              disabled={disabled}
              aria-haspopup="listbox"
              aria-controls={`${selectId}_dropdown`}
              aria-labelledby={`${selectId}_label`}
              aria-expanded={isDropdownOpen}
              aria-activedescendant={`${selectId}_element_${selectedItem?.value}`}
              onClick={disabled ? () => undefined : () => setIsDropdownOpen(!isDropdownOpen)}
              onFocus={() => setIsDropdownTriggerFocus(true)}
              onBlur={() => setIsDropdownTriggerFocus(false)}
              type="button">
              {selectedItem?.label}
            </button>

            <div ref={selectIconRef} className="input__icon-end-wrapper" onClick={() => handleIconClick(disabled)}>
              <ChevronDown className={clsx("input__icon", disabled && "input__icon--disabled")} />
            </div>

            <DropdownList
              fit
              triggerId={selectId}
              isOpen={isDropdownOpen}
              onClickOutside={{ callback: () => setIsDropdownOpen(false), exceptRef: [buttonRef, selectIconRef] }}>
              {options.map((item, index) => (
                <DropDownListItem
                  key={item.value}
                  id={`${selectId}_element_${item.value}`}
                  item={item}
                  isSelected={item.value === selectedItem?.value}
                  isHighlighted={index === activeIndex}
                  onMouseOver={() => setActiveIndex(index)}
                  onClick={() => {
                    select(selectRef)(item.value);
                    setIsDropdownOpen(false);
                  }}
                />
              ))}
            </DropdownList>
          </div>
          {hint && isValidElement(hint) && (
            <div className={clsx("input__hint", error && "input__hint--error")}>{hint}</div>
          )}
          {hint && !isValidElement(hint) && (
            <p className={clsx("input__hint", error && "input__hint--error")}>{hint}</p>
          )}
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
