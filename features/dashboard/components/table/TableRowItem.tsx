import { ReactNode } from "react";

import "./tableRowItem.style.scss";

interface TableRowItemProps {
  children: ReactNode;
}
export const TableRowItem = ({ children }: TableRowItemProps) => <td className="table__row-item">{children}</td>;
