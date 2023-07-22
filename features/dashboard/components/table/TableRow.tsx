import { ReactNode } from "react";

import "./tableRow.style.scss";

interface TableRowProps {
  children: ReactNode;
}
export const TableRow = ({ children }: TableRowProps) => <tr>{children}</tr>;
