import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

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

describe('NavigationList', () => {
  test('рендерится без ошибок', () => {
    renderComponent({}, {}, {});
  });
  test('для нумерации добавляется класс ordered', () => {
    renderComponent({ ordered: true, testId: 'list' }, {}, {});

    const list = screen.getByTestId('list');

    expect(list.classList.contains('VegaNavigationList_ordered')).toBe(true);
  });
});

describe('NavigationListItem', () => {
  test('к активному элементу добавляется active класс', () => {
    renderComponent({}, { active: true, testId: 'item' }, {});

    const item = screen.getByTestId('item');

    expect(item.classList.contains('VegaNavigationListItem_active')).toBe(true);
  });
  test('при клике по элементу срабатывает onClick', () => {
    const onClick = jest.fn();

    renderComponent({}, { onClick, testId: 'item' }, {});

    const item = screen.getByTestId('item');

    fireEvent.click(item);
    expect(onClick).toBeCalled();
  });
  test('при выборе элемента через Enter срабатывает onClick', () => {
    const onClick = jest.fn();

    renderComponent({}, { onClick, testId: 'item' }, {});

    const item = screen.getByTestId('item');

    fireEvent.keyUp(item, { key: 'Enter', code: 'Enter' });
    expect(onClick).toBeCalled();
  });
});

describe('NavigationListDelimiter', () => {
  test('добавляется resetCounter класс по требованию', () => {
    renderComponent({}, {}, { resetCounter: true, testId: 'delimiter' });

    const item = screen.getByTestId('delimiter');

    expect(item.classList.contains('VegaNavigationListDelimiter_resetCounter')).toBe(true);
  });
});
