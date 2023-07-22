import { ReactNode } from "react";

import "./tableBody.style.scss";

interface TableBodyProps {
  children: ReactNode;
}

export const TableBody = ({ children }: TableBodyProps) => <>{children}</>;
