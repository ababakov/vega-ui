import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import {
  NavigationList,
  NavigationListDelimiter,
  NavigationListDelimiterProps,
  NavigationListItem,
  NavigationListItemProps,
  NavigationListProps,
} from './NavigationList';

const renderComponent = (
  listProps: NavigationListProps,
  itemProps: NavigationListItemProps,
  delimiterProps: NavigationListDelimiterProps,
): RenderResult => {
  return render(
    <NavigationList {...listProps}>
      <NavigationListItem {...itemProps}>Первый</NavigationListItem>
      <NavigationListItem>Второй</NavigationListItem>
      <NavigationListItem>Третий</NavigationListItem>
      <NavigationListDelimiter {...delimiterProps} />
      <NavigationListItem>Четвертый</NavigationListItem>
      <NavigationListItem>Пятый</NavigationListItem>
    </NavigationList>,
  );
};

// const findLink = (testId = 'test-item'): Element => {
//   return screen.getByTestId(testId);
// };

// const baseListProps: NavigationListProps = {};
// const baseItemProps: NavigationListItemProps = {};
// const baseDelimiterProps: NavigationListDelimiterProps = {};

describe('Dropdown', () => {
  test('рендерится без ошибок', () => {
    renderComponent({}, {}, {});
  });

  //   test('dropdown рендерится, если isOpen: true', () => {
  //     renderComponent(
  //       { ...baseDropdownProps, testId: 'TestDropdown' },
  //       { ...baseMenuProps },
  //       { ...baseItemProps },
  //     );

  //     expect(screen.getByTestId('TestDropdown')).toBeInTheDocument();
  //   });

  //   test('dropdown не рендерится, если isOpen: false', () => {
  //     renderComponent(
  //       { ...baseDropdownProps, isOpen: false },
  //       { ...baseMenuProps },
  //       { ...baseItemProps },
  //     );

  //     const dropdownItem = screen.queryByText('TEST');

  //     expect(dropdownItem).not.toBeInTheDocument();
  //   });
});

// describe('DropdownItem', () => {
//   test('проставляется класс is-active для активного элемента', () => {
//     renderComponent(baseDropdownProps, baseMenuProps, { ...baseItemProps, testId: 'test-item' });

//     const item = screen.getByTestId('test-item');

//     expect(item.classList.contains('is-active')).toBe(true);
//   });

//   test('вызывается onChangeActive по клику на Item', () => {
//     const onChangeActive = jest.fn();
//     renderComponent(
//       baseDropdownProps,
//       { ...baseMenuProps, onChangeActive, activeName: 'second' },
//       { ...baseItemProps, testId: 'test-item' },
//     );

//     const item = findLink();

//     fireEvent.click(item);
//     expect(onChangeActive).toBeCalled();
//   });

//   test('вызывается onClose по клику на Item', () => {
//     const onClose = jest.fn();

//     renderComponent({ ...baseDropdownProps, onClose }, baseMenuProps, {
//       ...baseItemProps,
//       testId: 'test-item',
//     });

//     const item = findLink();

//     fireEvent.click(item);
//     expect(onClose).toBeCalled();
//   });

//   test('в Item прокидывается любой компонент', () => {
//     renderComponent(baseDropdownProps, baseMenuProps, {
//       ...baseItemProps,
//       testId: 'test-item',
//       as: 'span',
//     });

//     const item = findLink();

//     expect(item.tagName).toBe('SPAN');
//   });
// });
