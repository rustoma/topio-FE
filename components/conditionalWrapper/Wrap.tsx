import { createElement,ReactNode } from "react";

interface WrapProps {
  if?: boolean;
  with: (typeof createElement.arguments)[0];
  wrapperProps?: (typeof createElement.arguments)[1];
  children: NonNullable<ReactNode>;
}

export const Wrap = ({ if: condition, with: wrapper, wrapperProps, children }: WrapProps) =>
  condition ? createElement(wrapper, wrapperProps, [children]) : <>{children}</>;
