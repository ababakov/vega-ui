import React from 'react';
import { render } from '@testing-library/react';

import { FooterPage } from './FooterPage';

describe('NavigationList', () => {
  test('рендерится без ошибок', () => {
    render(
      <FooterPage>
        <button type="button">Кнопка</button>
      </FooterPage>,
    );
  });
});
