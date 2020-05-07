import React from 'react';

export type DropdownContextProps = {
  onClose?: (e?: MouseEvent | TouchEvent) => void;
};

export const DropdownContext = React.createContext<DropdownContextProps>({ onClose: undefined });

export const useDropdownContext = (): DropdownContextProps => {
  return React.useContext(DropdownContext);
};
