import React from 'react';
import { storiesOf } from '@storybook/react';
import { block } from 'bem-cn';

// import { Button } from '@vega-ui/button';
import { Button } from '../../Button/src';

import { FooterPage } from './FooterPage';

import './FooterPageStories.css';

const cnStories = block('NavigationListStories');

storiesOf('ui/FooterPage', module)
  .add('Кнопки с одной стороны', () => (
    <div className={cnStories('wrapper')}>
      <FooterPage className={cnStories('case-1').toString()}>
        <Button size="m" view="primary" label="Кнопка" />
      </FooterPage>
    </div>
  ))
  .add('Кнопки с двух сторон', () => (
    <div className={cnStories('wrapper')}>
      <FooterPage className={cnStories('case-2').toString()}>
        <div>
          <Button size="m" view="primary" label="Кнопка" />
        </div>
        <div>
          <Button size="m" view="primary" label="Кнопка" />
        </div>
      </FooterPage>
    </div>
  ));
