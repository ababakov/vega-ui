import React from 'react';

import { cnDropdown } from './helpers/cnDropdown';
import { useDropdownMenu } from './DropdownContext';

export type DropdownLinkProps = {
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
  name: string;
  testId?: string;
};

export const DropdownLink: React.FC<DropdownLinkProps> = (props) => {
  const { children, as = 'div', name, className, testId, ...rest } = props;

  const { activeName, onChangeActive } = useDropdownMenu();

  const isActive: boolean = activeName === name;

  const onLinkClick = (): void => {
    if (onChangeActive && !isActive) {
      onChangeActive(name);
    }
  };

  const LinkComponent = as;

  const linkClassName = cnDropdown('Link').mix(className).state({ active: isActive }).toString();

  return (
    <LinkComponent data-testid={testId} className={linkClassName} onClick={onLinkClick} {...rest}>
      {children}
    </LinkComponent>
  );
};
