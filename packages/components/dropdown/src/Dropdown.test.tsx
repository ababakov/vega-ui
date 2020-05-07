import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { Dropdown, DropdownProps } from './Dropdown';
import { DropdownLinkProps } from './DropdownLink';
import { DropdownMenuProps } from './DropdownMenu';

const baseDropdownProps: DropdownProps = { onClose: jest.fn(), isOpen: true };

type ComponentsProps = {
  dropdownProps?: Partial<DropdownProps>;
  menuProps?: Partial<DropdownMenuProps>;
  itemProps?: Partial<DropdownLinkProps>;
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
    <Dropdown {...props.dropdownProps} trigger={trigger} data-testid="Dropdown:root">
      <Dropdown.Menu {...props.menuProps}>
        <Dropdown.Item>
          <Dropdown.Link isActive {...props.itemProps} data-testid="Dropdown:Link">
            TEST
          </Dropdown.Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Dropdown.Link>SECOND</Dropdown.Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>,
  );
};

const findLink = (testId = 'Dropdown:Link'): Element => {
  return screen.getByTestId(testId);
};

describe('Dropdown', () => {
  test('рендерится без ошибок', () => {
    renderComponent();
  });

  test('dropdown рендерится, если isOpen: true', () => {
    renderComponent();

    expect(screen.getByTestId('Dropdown:root')).toBeInTheDocument();
  });

  test('dropdown не рендерится, если isOpen: false', () => {
    renderComponent({ dropdownProps: { isOpen: false } });

    const dropdownItem = screen.queryByText('TEST');

    expect(dropdownItem).not.toBeInTheDocument();
  });
});

describe('DropdownItem', () => {
  test('проставляется класс is-active для активного элемента', () => {
    renderComponent();

    const item = findLink();

    expect(item.classList.contains('is-active')).toBe(true);
  });

  test('вызывается onClose по клику на Item', () => {
    const onClose = jest.fn();

    renderComponent();

    const item = findLink();

    fireEvent.click(item);
    expect(onClose).toBeCalled();
  });

  test('в Item прокидывается любой компонент', () => {
    renderComponent({ itemProps: { as: 'span' } });

    const item = findLink();

    expect(item.tagName).toBe('SPAN');
  });
});
