import React from 'react';

type DropdownTriggerProps = {
  id: string;
  children?: React.ReactNode;
  className?: string;
};

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  id,
  children,
  className,
  ...rest
}) => (
  <div id={id} className={className} {...rest}>
    {children}
  </div>
);
