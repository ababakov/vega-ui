import React from 'react';

import { cnDropdown } from './helpers/cnDropdown';
import { useDropdown, useDropdownMenu } from './DropdownContext';

import './Dropdown.css';

type DropdownItemProps = {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  onClick?: (e: Event) => void;
  name: string;
};

export const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const { className, children, as = 'div', onClick, name, ...rest } = props;

  const { onClose: onMenuClose } = useDropdown();
  const { activeName, onChangeActive } = useDropdownMenu();

  const isActive: boolean = activeName === name;

  const onItemClick = (e: Event): void => {
    if (onClick) {
      onClick(e);
    }
    if (onMenuClose) {
      onMenuClose();
    }
    if (onChangeActive) {
      onChangeActive(name);
    }
  };

  const ItemComponent = as;

  const itemClassName: string = cnDropdown('Item').mix(className).state({ active: isActive });

  return (
    <ItemComponent {...rest} onClick={onItemClick} className={itemClassName}>
      {children}
    </ItemComponent>
  );
};
