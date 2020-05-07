import React from 'react';

import { cnDropdown } from './helpers/cnDropdown';

import './Dropdown.css';

export type DropdownMenuProps = {
  className?: string;
  children?: React.ReactNode;
  testId?: string;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  className,
  children,
  testId,
  ...rest
}) => {
  return (
    <nav role="navigation">
      <ul {...rest} data-testid={testId} className={cnDropdown('Menu').mix(className)}>
        {children}
      </ul>
    </nav>
  );
};
