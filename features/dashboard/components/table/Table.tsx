import React, { ReactNode } from "react";

import "./table.style.scss";

interface TableProps {
  children: ReactNode;
}

export const Table = ({ children }: TableProps) => {
  return <table className="table">{children}</table>;
};
