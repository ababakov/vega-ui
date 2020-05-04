import React from 'react';

import { cnDropdown } from './helpers/cnDropdown';
import { DropdownMenuContext } from './DropdownContext';

import './Dropdown.css';

type DropdownMenuProps = {
  className?: string;
  children: React.ReactNode;
  activeName: string;
  onChangeActive?: (name: string) => void;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  className,
  children,
  activeName,
  onChangeActive,
  ...rest
}) => {
  return (
    <DropdownMenuContext.Provider value={{ onChangeActive, activeName }}>
      <nav role="navigation">
        <ul {...rest} className={cnDropdown('Menu').mix(className)}>
          {children}
        </ul>
      </nav>
    </DropdownMenuContext.Provider>
  );
};
