import React, { useState } from 'react';
import { IIcon } from '@gpn-design/uikit/Icon';
import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { IconCamera, IconPhoto, IconRing } from '@vega-ui/icons';

import { Tabs } from './Tabs';

type IconElement = (props: IIcon) => JSX.Element;

type Item = {
  name: string;
  icon?: IconElement;
};

type StoriesProps = {
  size: 's' | 'm';
  view: 'bordered' | 'clear';
  onlyIcon?: boolean;
  withIcon: boolean;
};

const items = [
  {
    name: 'Первый',
    icon: IconPhoto,
  },
  {
    name: 'Очень длинный второй вариант',
    icon: IconRing,
  },
  {
    name: 'Третий вариант',
    icon: IconCamera,
  },
  {
    name: 'Очень длинный xч вариант',
    icon: IconRing,
  },
  {
    name: 'Третийц вариант',
    icon: IconCamera,
  },
  {
    name: 'Оченья длинный второй вариант',
    icon: IconRing,
  },
  {
    name: 'Третийыы вариант',
    icon: IconCamera,
  },
];

function Stories({ size, view, onlyIcon, withIcon }: StoriesProps): React.ReactElement {
  const [valueTab, setValueTab] = useState<Item[] | null>([
    {
      name: 'Оченья длинный второй вариант',
      icon: IconRing,
    },
  ]);

  return (
    <Tabs<Item>
      items={items}
      value={valueTab}
      getItemKey={(item): string => item.name}
      getItemLabel={(item): string => item.name}
      getItemIcon={withIcon ? (item): IconElement | undefined => item.icon : undefined}
      onChange={({ value }): void => setValueTab(value)}
      size={size}
      view={view}
      onlyIcon={onlyIcon}
    />
  );
}

const knobs = (): StoriesProps => ({
  size: select('size', ['s', 'm'], 'm'),
  view: select('view', ['bordered', 'clear'], 'bordered'),
  withIcon: boolean('withIcon', false),
  onlyIcon: boolean('onlyIcon', false),
});

storiesOf('ui/Tabs', module).add('Табы', () => <Stories {...knobs()} />);
