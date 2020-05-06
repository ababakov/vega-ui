import React from 'react';

import { cnDropdown } from './helpers/cnDropdown';
import { useDropdownContext } from './DropdownContext';

import './Dropdown.css';

type LiMouseEvent = React.MouseEvent<HTMLLIElement, MouseEvent>;

export type DropdownItemProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: LiMouseEvent) => void;
  as?: React.ElementType;
  testId?: string;
};

export const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const { className, children, onClick, testId, as = 'li', ...rest } = props;

  const { onClose: onMenuClose } = useDropdownContext();

  const onItemClick = (e: LiMouseEvent): void => {
    if (onClick) {
      onClick(e);
    }
    if (onMenuClose) {
      onMenuClose();
    }
  };

  const ItemComponent = as;

  const itemClassName: string = cnDropdown('Item').mix(className).toString();
  return (
    <ItemComponent {...rest} onClick={onItemClick} data-testid={testId} className={itemClassName}>
      {children}
    </ItemComponent>
  );
};
