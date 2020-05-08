import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { Dropdown, DropdownProps } from './Dropdown';
import { DropdownItemProps } from './DropdownItem';
import { DropdownMenuProps } from './DropdownMenu';

const baseDropdownProps: DropdownProps = { onClose: jest.fn(), isOpen: true };

type ComponentsProps = {
  dropdownProps?: Partial<DropdownProps>;
  menuProps?: Partial<DropdownMenuProps>;
  itemProps?: Partial<DropdownItemProps>;
};

const renderComponent = (componentsProps: ComponentsProps = {}): RenderResult => {
  const { dropdownProps, menuProps, itemProps } = componentsProps;
  const trigger = <button type="button">click me</button>;
  const props = {
    dropdownProps: { ...baseDropdownProps, ...dropdownProps },
    menuProps,
    itemProps,
  };

  return render(
    <Dropdown {...props.dropdownProps} trigger={trigger} data-testid="Dropdown:Root">
      <Dropdown.Menu {...props.menuProps}>
        <Dropdown.Item isActive {...props.itemProps} data-testid="Dropdown:Item">
          TEST
        </Dropdown.Item>
        <Dropdown.Item>SECOND</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>,
  );
};

const findItem = (testId = 'Dropdown:Item'): Element => {
  return screen.getByTestId(testId);
};

describe('Dropdown', () => {
  test('рендерится без ошибок', () => {
    renderComponent();
  });

  test('dropdown рендерится, если isOpen: true', () => {
    renderComponent();

    expect(screen.getByTestId('Dropdown:Root')).toBeInTheDocument();
  });

  test('dropdown не рендерится, если isOpen: false', () => {
    renderComponent({ dropdownProps: { isOpen: false } });

    const dropdownItem = screen.queryByText('TEST');

    expect(dropdownItem).not.toBeInTheDocument();
  });

  describe('Рендер с использованием портала', () => {
    test('корректно рендерится', () => {
      render(
        <>
          <Dropdown.Trigger id="test-trigger">
            <button type="button">Click me</button>
          </Dropdown.Trigger>
          <Dropdown
            onClose={jest.fn()}
            isOpen
            portal
            portalId="test-trigger"
            data-testid="portal-dropdown"
          >
            test data
          </Dropdown>
        </>,
      );

      expect(screen.getByTestId('portal-dropdown')).toBeInTheDocument();
    });
  });
});

describe('DropdownItem', () => {
  test('вызывается onClose по клику на Item', () => {
    const onClose = jest.fn();

    renderComponent({ dropdownProps: { onClose } });

    const item = screen.getByTestId('Dropdown:Item');

    fireEvent.click(item.firstChild as ChildNode);

    expect(onClose).toBeCalled();
  });

  test('проставляется класс is-active для активного элемента', () => {
    renderComponent();

    const item = findItem();

    expect(item.classList.contains('is-active')).toBe(true);
  });
});
