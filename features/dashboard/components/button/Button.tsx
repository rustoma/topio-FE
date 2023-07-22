import React, { ComponentPropsWithoutRef, createElement, ElementType, ReactNode } from "react";
import clsx from "clsx";

import "./button.style.scss";

export type ButtonProps<T extends ElementType> = {
  children: ReactNode | ReactNode[];
  element?: T;
  fit?: boolean;
  variant?: "solid" | "outline";
  style?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = "button">({
  children,
  variant = "solid",
  style = "primary",
  size = "md",
  fit = false,
  loading = false,
  element,
  ...rest
}: ButtonProps<T>) => {
  return createElement(
    element || "button",
    {
      className: clsx(
        "btn",
        ["btn", style].join("--"),
        ["btn", variant].join("--"),
        ["btn", size].join("--"),
        fit && "btn--fit",
        loading && "btn--loading"
      ),
      ...rest,
    },
    <>
      {children} {loading && <span>...</span>}
    </>
  );
};
