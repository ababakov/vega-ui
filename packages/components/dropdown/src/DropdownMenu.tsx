import React from 'react';

import { cnDropdown } from './helpers/cnDropdown';
import { DropdownMenuContext } from './DropdownContext';

import './Dropdown.css';

type DropdownMenuProps = {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  activeName: string;
  onChangeActive?: (name: string) => void;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  className,
  children,
  as = 'nav',
  activeName,
  onChangeActive,
  ...rest
}) => {
  const ListComponent = as;
  return (
    <DropdownMenuContext.Provider value={{ onChangeActive, activeName }}>
      <ListComponent {...rest} className={cnDropdown('Menu').mix(className)}>
        {children}
      </ListComponent>
    </DropdownMenuContext.Provider>
  );
};
