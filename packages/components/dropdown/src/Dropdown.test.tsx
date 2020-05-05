import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { Dropdown, DropdownProps } from './Dropdown';
import { DropdownItemProps } from './DropdownItem';
import { DropdownMenuProps } from './DropdownMenu';

const renderComponent = (
  dropdownProps: DropdownProps,
  menuProps: DropdownMenuProps,
  itemProps: DropdownItemProps,
): RenderResult => {
  const trigger = <button type="button">click me</button>;

  return render(
    <Dropdown {...dropdownProps} trigger={trigger}>
      <Dropdown.Menu {...menuProps}>
        <Dropdown.Item {...itemProps}>TEST</Dropdown.Item>
        <Dropdown.Item name="second">SECOND</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>,
  );
};

const findItem = (testId = 'test-item'): ChildNode => {
  return screen.getByTestId(testId).firstChild as ChildNode;
};

const baseDropdownProps: DropdownProps = { onClose: jest.fn(), isOpen: true };
const baseMenuProps: DropdownMenuProps = { activeName: 'test' };
const baseItemProps: DropdownItemProps = { name: 'test' };

describe('Dropdown', () => {
  test('рендерится без ошибок', () => {
    renderComponent(baseDropdownProps, baseMenuProps, baseItemProps);
  });

  test('dropdown рендерится, если isOpen: true', () => {
    renderComponent(
      { ...baseDropdownProps, testId: 'TestDropdown' },
      { ...baseMenuProps },
      { ...baseItemProps },
    );

    expect(screen.getByTestId('TestDropdown:Root')).toBeInTheDocument();
  });

  test('dropdown не рендерится, если isOpen: false', () => {
    renderComponent(
      { ...baseDropdownProps, isOpen: false },
      { ...baseMenuProps },
      { ...baseItemProps },
    );

    const dropdownItem = screen.queryByText('TEST');

    expect(dropdownItem).not.toBeInTheDocument();
  });
});

describe('DropdownItem', () => {
  test('проставляется класс is-active для активного элемента', () => {
    renderComponent(baseDropdownProps, baseMenuProps, { ...baseItemProps, testId: 'test-item' });

    const item = screen.getByTestId('test-item');

    expect(item.classList.contains('is-active')).toBe(true);
  });

  test('вызывается onChangeActive по клику на Item', () => {
    const onChangeActive = jest.fn();
    renderComponent(
      baseDropdownProps,
      { ...baseMenuProps, onChangeActive, activeName: 'second' },
      { ...baseItemProps, testId: 'test-item' },
    );

    const item = findItem();

    fireEvent.click(item);
    expect(onChangeActive).toBeCalled();
  });

  test('вызывается onClose по клику на Item', () => {
    const onClose = jest.fn();

    renderComponent({ ...baseDropdownProps, onClose }, baseMenuProps, {
      ...baseItemProps,
      testId: 'test-item',
    });

    const item = findItem();

    fireEvent.click(item);
    expect(onClose).toBeCalled();
  });

  test('вызывается onClick по клику на Item', () => {
    const onClick = jest.fn();

    renderComponent(baseDropdownProps, baseMenuProps, {
      ...baseItemProps,
      testId: 'test-item',
      onClick,
    });

    const item = findItem();

    fireEvent.click(item);

    expect(onClick).toBeCalled();
  });

  test('в Item прокидывается любой компонент', () => {
    renderComponent(baseDropdownProps, baseMenuProps, {
      ...baseItemProps,
      testId: 'test-item',
      as: 'span',
    });

    const item = findItem();

    expect(item.nodeName).toBe('SPAN');
  });
});
