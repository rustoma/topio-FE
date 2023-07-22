import React, { ReactNode } from "react";

import "./helperText.style.scss";

interface HelperTextProps {
  children: ReactNode | string;
}

export const HelperText = ({ children }: HelperTextProps) => {
  return <div>{children}</div>;
};
