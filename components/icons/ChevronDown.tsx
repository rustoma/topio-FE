import React from 'react';

import { Icon } from '@/types/icon';

export const ChevronDown = ({ className }: Icon) => {
  return (
    <svg viewBox='0 0 34 22' className={className}>
      <path d='M1.5 1.5L17 19.5L32.5 1.5' strokeWidth='3' />
    </svg>
  );
};
