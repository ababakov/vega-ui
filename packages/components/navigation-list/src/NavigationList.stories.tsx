import React from 'react';
import { cn } from '@gpn-design/uikit/__internal__/src/utils/bem';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { IconCheck } from '../../icons/index';

import {
  DelimiterProps,
  ListProps,
  NavigationList,
  NavigationListDelimiter,
  NavigationListItem,
} from './NavigationList';

import './NavigationListStories.css';

const cnStories = cn('NavigationListStories');

const testFn = (): void => {
  // eslint-disable-next-line no-console
  console.log('Item click');
};

const knobs = (): ListProps & DelimiterProps => ({
  ordered: boolean('ordered', false),
  start: number('start', 0),
  resetCounter: boolean('resetCounter', false),
});

storiesOf('ui/NavigationList', module)
  .addDecorator(withKnobs)
  .add('Обычный', () => (
    <div className={cnStories('wrapper')}>
      <NavigationList {...knobs()}>
        <NavigationListItem active onClick={testFn} className={cnStories('withIcon')}>
          Описание проекта <IconCheck size="s" view="success" className={cnStories('icon')} />
        </NavigationListItem>
        <NavigationListItem onClick={testFn}>Участники</NavigationListItem>
        <NavigationListItem onClick={testFn}>Связанные документы и файлы</NavigationListItem>
      </NavigationList>
    </div>
  ))
  .add('C разделителем', () => (
    <div style={{ width: '302px' }}>
      <NavigationList {...knobs()}>
        <NavigationListItem active onClick={testFn} className={cnStories('withIcon')}>
          Описание проекта <IconCheck size="s" view="success" className={cnStories('icon')} />
        </NavigationListItem>
        <NavigationListItem onClick={testFn}>Участники</NavigationListItem>
        <NavigationListItem onClick={testFn}>Связанные документы и файлы</NavigationListItem>
        <NavigationListDelimiter {...knobs()} />
        <NavigationListItem onClick={testFn}>Похожие проекты</NavigationListItem>
        <NavigationListItem onClick={testFn}>Не похожие проекты</NavigationListItem>
      </NavigationList>
    </div>
  ));
