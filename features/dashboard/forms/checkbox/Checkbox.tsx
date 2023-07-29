import React, { ChangeEventHandler, isValidElement,ReactElement } from "react";
import clsx from "clsx";

import { ChevronDown } from "@/components/icons/ChevronDown";

import "./checkbox.style.scss";
interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "className" | "size" | "pattern" | "type"> {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label?: ReactElement | string;
  fit?: boolean;
  readOnly?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, label, name, disabled, onChange, fit, readOnly, ...rest }, ref) => {
    return (
      <div className="checkbox">
        <label
          className={clsx(
            "checkbox__root",
            readOnly && "checkbox__root--readonly",
            disabled && "checkbox__root--disabled"
          )}>
          <input
            ref={ref}
            className="checkbox--hidden"
            name={name}
            type="checkbox"
            checked={checked}
            onChange={disabled ? () => undefined : onChange}
            {...rest}
          />

          <ChevronDown className={clsx("checkbox__icon", checked && "checkbox__icon--checked")} />

          {label && isValidElement(label) && <div className="input__hint">{label}</div>}
          {label && !isValidElement(label) && <p className="input__hint">{label}</p>}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
