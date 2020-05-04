import React from 'react';
import { Button } from '@gpn-design/uikit/Button';
import { storiesOf } from '@storybook/react';

import { Dropdown } from './Dropdown';

storiesOf('ui/Dropdown', module).add('Dropdown', () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const triggerNode = <Button label="Click Me" onClick={(): void => setIsOpen(!isOpen)} />;

  return (
    <Dropdown isOpen={isOpen} trigger={triggerNode} onClose={(): void => setIsOpen(false)}>
      <Dropdown.Menu activeName="first">
        <Dropdown.Item name="first">First</Dropdown.Item>
        <Dropdown.Item name="second">First</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
});
