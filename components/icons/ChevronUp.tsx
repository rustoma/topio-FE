import React from 'react';

import { Icon } from '@/types/icon';

export const ChevronUp = ({ className }: Icon) => {
  return (
    <svg viewBox='0 0 34 22' className={className}>
      <path d='M32.5 20.5L17 2.5L1.5 20.5' strokeWidth='3' />
    </svg>
  );
};
