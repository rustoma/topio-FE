import React, { ReactNode } from "react";

import "./tableHeader.style.scss";

interface TableHeaderProps {
  children: ReactNode;
}

export const TableHeader = ({ children }: TableHeaderProps) => <tr className="table__header">{children}</tr>;
