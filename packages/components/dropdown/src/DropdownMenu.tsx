import React from 'react';

import { cnDropdown } from './helpers/cnDropdown';
import { DropdownMenuContext } from './DropdownContext';

import './Dropdown.css';

export type DropdownMenuProps = {
  className?: string;
  children?: React.ReactNode;
  activeName: string;
  onChangeActive?: (name: string) => void;
  testId?: string;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  className,
  children,
  activeName,
  onChangeActive,
  testId,
  ...rest
}) => {
  return (
    <DropdownMenuContext.Provider value={{ onChangeActive, activeName }}>
      <nav role="navigation">
        <ul {...rest} data-testid={testId} className={cnDropdown('Menu').mix(className)}>
          {children}
        </ul>
      </nav>
    </DropdownMenuContext.Provider>
  );
};
