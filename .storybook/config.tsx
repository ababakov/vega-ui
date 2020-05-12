import * as React from 'react';
import { addDecorator, configure, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withPerformance } from 'storybook-addon-performance';
import { withThemes } from 'storybook-addon-themes';
import { AppContainer, AppContainerManager } from '@vega-ui/app-container/src';

import { cnTheme } from '@gpn-design/uikit/Theme';

import { storybookThemes } from './themes';

import '@gpn-design/uikit/__internal__/src/components/Theme/Theme.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDark.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDisplay.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_space/Theme_space_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_size/Theme_size_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_font/theme_font_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_control/Theme_control_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/utils/whitepaper/whitepaper.css';

const themes = cnTheme({
  space: 'gpnDefault',
  size: 'gpnDefault',
  font: 'gpnDefault',
  control: 'gpnDefault',
});

const appContainerManager = new AppContainerManager('rootSelector', 'modalRoot');

const defaultClassName = `Theme ${themes} Theme_color_gpnDefault`;

appContainerManager.createPortalRoot({ className: defaultClassName })

const ThemeDecorator = ({ children, theme = { class: 'Theme_color_gpnDefault' } }) => {
  const className = `Theme ${themes} ${theme.class}`;
  document.body.className = className;
  appContainerManager.updatePortalRootClassName(className);
  return <div className={className}>{children}</div>;
}

addParameters({
  themes: { list: storybookThemes(), Decorator: ThemeDecorator },
});

addDecorator(withKnobs);
addDecorator(withPerformance);
addDecorator((story) => {
  return story();
});

addDecorator((storyFn) => {
  window.document.documentElement.lang = 'ru';

  document.body.className = defaultClassName;

  return <div>{storyFn()}</div>;
});

addDecorator((story) => {
  const appStyles = {
    background: 'var(--color-bg-default)',
    padding: 'var(--space-3xl)',
    minHeight: '100vh',
  };

  return (
    <AppContainer appContainerManager={appContainerManager} style={appStyles}>
      {story()}
    </AppContainer>
  );
});

addDecorator(withThemes);

const req = require.context('../packages', true, /.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
