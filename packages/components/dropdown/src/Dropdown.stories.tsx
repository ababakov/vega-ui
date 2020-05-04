import React from 'react';
import { Button } from '@gpn-design/uikit/Button';
import { Text } from '@gpn-design/uikit/Text';
import { storiesOf } from '@storybook/react';

import { Dropdown } from './Dropdown';

storiesOf('ui/Dropdown', module).add('Dropdown', () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [activeItem, setActiveItem] = React.useState<string>('first');

  const triggerNode = <Button label="Click Me" onClick={(): void => setIsOpen(!isOpen)} />;

  return (
    <Dropdown isOpen={isOpen} trigger={triggerNode} onClose={(): void => setIsOpen(false)}>
      <Dropdown.Menu activeName={activeItem} onChangeActive={setActiveItem}>
        <Dropdown.Item name="first">
          <Text>First</Text>
        </Dropdown.Item>
        <Dropdown.Item name="second">
          <Text>Second</Text>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
});
