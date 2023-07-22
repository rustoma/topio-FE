import React, { ReactNode } from "react";

import "./formRow.style.scss";

interface FormRowProps {
  children: ReactNode;
}

export const FormRow = ({ children }: FormRowProps) => {
  return <div className="form-row">{children}</div>;
};
