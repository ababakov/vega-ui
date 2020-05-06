import React from 'react';

export type DropdownContextProps = {
  onClose?: (e?: MouseEvent | TouchEvent) => void;
};

export const DropdownContext = React.createContext<DropdownContextProps>({ onClose: undefined });

export const useDropdownContext = (): DropdownContextProps => {
  return React.useContext(DropdownContext);
};

export type DropdownMenuContextProps = {
  onChangeActive?: (name: string) => void;
  activeName?: string;
};

export const DropdownMenuContext = React.createContext<DropdownMenuContextProps>({
  activeName: '',
  onChangeActive: undefined,
});

export const useDropdownMenu = (): DropdownMenuContextProps => {
  return React.useContext(DropdownMenuContext);
};
