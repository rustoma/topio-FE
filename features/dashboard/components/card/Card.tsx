import React, { ReactNode } from "react";

import "./card.styles.scss";

interface CardProps {
  children: ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return <div className="card">{children}</div>;
};
