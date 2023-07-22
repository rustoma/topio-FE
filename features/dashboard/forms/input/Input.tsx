import React, { ChangeEvent, ChangeEventHandler, isValidElement, ReactElement, useId, useRef } from "react";
import clsx from "clsx";

import { Wrap } from "@/components/conditionalWrapper/Wrap";
import { useForwardRef } from "@/hooks/useForwardRef";

import "./input.style.scss";

interface InputProps extends Omit<React.ComponentPropsWithoutRef<"input">, "className" | "size" | "pattern"> {
  size?: "lg" | "md" | "sm";
  label?: string;
  hint?: ReactElement | string | false;
  error?: boolean;
  pattern?: RegExp | string;
  fit?: boolean;
}

const useInput = () => {
  const focusInput = (ref: React.MutableRefObject<HTMLInputElement | null>) => {
    if (ref?.current) {
      return ref.current.focus();
    }
  };

  const onChangeWithPattern = (
    event: ChangeEvent<HTMLInputElement>,
    onChange: ChangeEventHandler<HTMLInputElement>,
    pattern?: RegExp | string
  ) => {
    if (!pattern || typeof pattern === "string") return onChange(event);

    const value = event.target.value;
    if (value !== "" && !pattern.test(value)) {
      return;
    }

    onChange(event);
  };

  return {
    focusInput,
    onChangeWithPattern,
  };
};

export const Input = React.forwardRef(
  (
    { label, hint, pattern, fit, disabled, required, onChange, error = false, size = "md", ...rest }: InputProps,
    forwardedRef: React.ForwardedRef<HTMLInputElement>
  ) => {
    const inputId = useId();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const combinedRef = useForwardRef(forwardedRef, inputRef);

    const { onChangeWithPattern } = useInput();

    return (
      <div className={clsx(fit && "input--fit")}>
        {(label || required) && (
          <div className="input__label-wrapper">
            {label && (
              <label className={clsx("input__label", error && "input__label--error")} htmlFor={rest.id || inputId}>
                {label}
              </label>
            )}
            {required && <span className="input__label-required">Wymagane*</span>}
          </div>
        )}
        <Wrap if={!label} with="label">
          <div className="relative">
            <input
              ref={combinedRef}
              id={rest.id || inputId}
              disabled={disabled}
              className={clsx("input", error && "input--error", fit && "input--fit")}
              pattern={typeof pattern === "string" ? pattern : undefined}
              onChange={onChange ? (event) => onChangeWithPattern(event, onChange, pattern) : undefined}
              {...rest}
            />
          </div>
        </Wrap>
        {hint && isValidElement(hint) && (
          <div className={clsx("input__hint", error && "input__hint--error")}>{hint}</div>
        )}
        {hint && !isValidElement(hint) && <p className={clsx("input__hint", error && "input__hint--error")}>{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
