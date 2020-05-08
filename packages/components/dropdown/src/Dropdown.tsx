import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { PossibleCloseEvent, usePortalDomNode, useRootClose } from '@vega-ui/hooks';

import { cnDropdown } from './helpers/cnDropdown';
import { DropdownDelimeter } from './DropdownDelimeter';
import { DropdownItem } from './DropdownItem';
import { DropdownMenu } from './DropdownMenu';
import { DropdownTrigger } from './DropdownTrigger';

import './Dropdown.css';

export type DropdownProps = {
  trigger?: React.ReactNode;
  onClose: (e?: PossibleCloseEvent) => void;
  children?: React.ReactNode;
  isOpen: boolean;
  className?: string;
  portalId?: string;
  portal?: boolean;
};

type Dropdown<T> = React.FC<T> & {
  Menu: typeof DropdownMenu;
  Item: typeof DropdownItem;
  Trigger: typeof DropdownTrigger;
  Delimeter: typeof DropdownDelimeter;
};

export const Dropdown: Dropdown<DropdownProps> = (props) => {
  const { trigger, onClose, children, className, isOpen, portalId, portal, ...rest } = props;
  const dropdownRef = useRef(null);

  const onDropdownClose = (e: PossibleCloseEvent): void => {
    if (isOpen) {
      onClose(e);
    }
  };

  useRootClose(dropdownRef, onDropdownClose);

  const portalNode = usePortalDomNode(`#${portalId}`);

  if (!portalNode && !trigger) {
    return null;
  }

  const cssTransitionClasses = {
    enter: cnDropdown.state({ enter: true }).toString(),
    enterActive: cnDropdown.state({ enterActive: true }).toString(),
    exit: cnDropdown.state({ exit: true }).toString(),
    exitActive: cnDropdown.state({ exitActive: true }).toString(),
  };

  const content = (
    <div ref={dropdownRef}>
      {trigger}
      <CSSTransition
        timeout={300}
        classNames={cssTransitionClasses}
        in={isOpen}
        mountOnEnter
        unmountOnExit
      >
        <div {...rest} className={cnDropdown('Root').mix(className)}>
          {children}
        </div>
      </CSSTransition>
    </div>
  );

  if (portalNode && portal) {
    return createPortal(content, portalNode);
  }

  return content;
};

Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Trigger = DropdownTrigger;
Dropdown.Delimeter = DropdownDelimeter;
