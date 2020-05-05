import React from 'react';

import { cnDropdown } from './helpers/cnDropdown';
import { useDropdownContext, useDropdownMenu } from './DropdownContext';

import './Dropdown.css';

type LiMouseEvent = React.MouseEvent<HTMLLIElement, MouseEvent>;

export type DropdownItemProps = {
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
  onClick?: (e: LiMouseEvent) => void;
  name: string;
  testId?: string;
};

export const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const { className, children, as = 'a', onClick, name, testId, ...rest } = props;

  const { onClose: onMenuClose } = useDropdownContext();
  const { activeName, onChangeActive } = useDropdownMenu();

  const isActive: boolean = activeName === name;

  const onItemClick = (e: LiMouseEvent): void => {
    if (onClick) {
      onClick(e);
    }
    if (onMenuClose) {
      onMenuClose();
    }
    if (onChangeActive && !isActive) {
      onChangeActive(name);
    }
  };

  const ItemComponent = as;

  const itemClassName: string = cnDropdown('Item')
    .mix(className)
    .state({ active: isActive })
    .toString();
  return (
    <li {...rest} data-testid={testId} className={itemClassName}>
      <ItemComponent onClick={onItemClick}>{children}</ItemComponent>
    </li>
  );
};
