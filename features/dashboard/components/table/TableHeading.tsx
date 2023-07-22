import React, { ReactNode } from "react";

import "./tableHeading.style.scss";

interface TableHeadingProps {
  children: ReactNode;
}
export const TableHeading = ({ children }: TableHeadingProps) => <th className="table__heading">{children}</th>;
