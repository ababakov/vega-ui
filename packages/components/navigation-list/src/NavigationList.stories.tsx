import React from 'react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { IconCheck } from '@vega-ui/icons';
import { block } from 'bem-cn';

import {
  NavigationList,
  NavigationListDelimiter,
  NavigationListDelimiterProps,
  NavigationListItem,
  NavigationListProps,
} from './NavigationList';

import './NavigationListStories.css';

const cnStories = block('NavigationListStories');

const knobs = (): NavigationListProps & NavigationListDelimiterProps => ({
  ordered: boolean('ordered', false),
  start: number('start', 0),
  resetCounter: boolean('resetCounter', false),
});

storiesOf('ui/NavigationList', module)
  .addDecorator(withKnobs)
  .add('Обычный', () => (
    <div className={cnStories('wrapper')}>
      <NavigationList {...knobs()}>
        <NavigationListItem active>Описание проекта</NavigationListItem>
        <NavigationListItem>Участники</NavigationListItem>
        <NavigationListItem>Связанные документы и файлы</NavigationListItem>
      </NavigationList>
    </div>
  ))
  .add('C иконкой', () => (
    <div className={cnStories('wrapper')}>
      <NavigationList {...knobs()}>
        <NavigationListItem className={cnStories('withIcon').toString()}>
          Описание проекта
          <IconCheck size="s" view="success" className={cnStories('icon').toString()} />
        </NavigationListItem>
        <NavigationListItem active>Участники</NavigationListItem>
        <NavigationListItem>Связанные документы и файлы</NavigationListItem>
      </NavigationList>
    </div>
  ))
  .add('C разделителем', () => (
    <div className={cnStories('wrapper')}>
      <NavigationList {...knobs()}>
        <NavigationListItem active>Описание проекта</NavigationListItem>
        <NavigationListItem>Участники</NavigationListItem>
        <NavigationListItem>Связанные документы и файлы</NavigationListItem>
        <NavigationListDelimiter {...knobs()} />
        <NavigationListItem>Похожие проекты</NavigationListItem>
        <NavigationListItem>Описание</NavigationListItem>
      </NavigationList>
    </div>
  ));
