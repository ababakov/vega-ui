import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useOnClickOutside } from '@vega-ui/hooks';

import { cnDropdown } from './helpers/cnDropdown';
import { DropdownContext } from './DropdownContext';
import { DropdownItem } from './DropdownItem';
import { DropdownMenu } from './DropdownMenu';

import './Dropdown.css';

export type DropdownProps = {
  trigger?: React.ReactNode;
  onClose: (e?: MouseEvent | TouchEvent) => void;
  children?: React.ReactNode;
  isOpen: boolean;
  className?: string;
  testId?: string;
};

type Dropdown<T> = React.FC<T> & {
  Menu: typeof DropdownMenu;
  Item: typeof DropdownItem;
};

export const Dropdown: Dropdown<DropdownProps> = (props) => {
  const { trigger, onClose, children, className, isOpen, testId } = props;
  const dropdownRef = useRef(null);

  const testID: Record<string, string> = {
    root: `${testId}:Root`,
  };

  useOnClickOutside({ ref: dropdownRef, handler: onClose });

  return (
    <DropdownContext.Provider value={{ onClose }}>
      <div ref={dropdownRef}>
        {trigger}
        <CSSTransition timeout={300} classNames="dropdown" in={isOpen} mountOnEnter unmountOnExit>
          <div data-testid={testID.root} className={cnDropdown('Root').mix(className)}>
            {children}
          </div>
        </CSSTransition>
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

Dropdown.defaultProps = {
  testId: 'Dropdown',
};
