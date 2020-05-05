import React from 'react';

type DropdownParams = {
  isOpen: boolean;
  activeName: string;
  handleChangeActiveName: (name: string) => void;
  toggleDropdownOpen: () => void;
  handleDropdownClose: () => void;
};

type Params = {
  defaultActiveName: string;
};

export const useDropdown = (
  { defaultActiveName }: Params = { defaultActiveName: '' },
): DropdownParams => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeName, setActiveName] = React.useState(defaultActiveName);

  const handleChangeActiveName = React.useCallback((name: string) => setActiveName(name), []);
  const toggleDropdownOpen = React.useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const handleDropdownClose = React.useCallback(() => setIsOpen(false), []);

  return {
    isOpen,
    activeName,
    handleChangeActiveName,
    toggleDropdownOpen,
    handleDropdownClose,
  };
};
