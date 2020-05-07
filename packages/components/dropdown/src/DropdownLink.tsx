import React from 'react';

import { cnDropdown } from './helpers/cnDropdown';

export type DropdownLinkProps = {
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
  isActive?: boolean;
};

export const DropdownLink: React.FC<DropdownLinkProps> = (props) => {
  const { children, as = 'div', className, isActive, ...rest } = props;

  const LinkComponent = as;

  const linkClassName = cnDropdown('Link')
    .mix(className)
    .state({ active: Boolean(isActive) })
    .toString();

  return (
    <LinkComponent className={linkClassName} {...rest}>
      {children}
    </LinkComponent>
  );
};
