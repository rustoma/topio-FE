import React from "react";

import { Icon } from "@/types/icon";

export const Calendar = ({ className }: Icon) => {
  return (
    <svg className={className} viewBox="0 0 10 11">
      <path d="M9 1H8.5V0H7.5V1H2.5V0H1.5V1H1C0.45 1 0 1.45 0 2V10C0 10.55 0.45 11 1 11H9C9.55 11 10 10.55 10 10V2C10 1.45 9.55 1 9 1ZM9 10H1V3.5H9V10Z" />
    </svg>
  );
};
