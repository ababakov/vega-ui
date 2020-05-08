import React from 'react';
import { Button } from '@gpn-design/uikit/Button';
import { Text } from '@gpn-design/uikit/Text';
import { storiesOf } from '@storybook/react';

import { Dropdown } from './Dropdown';
import { useDropdown } from './use-dropdown';

const DropdownMenu = (): React.ReactElement => {
  const [active, setActive] = React.useState('first');

  return (
    <Dropdown.Menu>
      <Dropdown.Item isActive={active === 'first'} onClick={(): void => setActive('first')}>
        <Text>First</Text>
      </Dropdown.Item>
      <Dropdown.Item isActive={active === 'second'} onClick={(): void => setActive('second')}>
        <Text>Second</Text>
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

storiesOf('ui/Dropdown', module)
  .add('Dropdown', () => {
    const { isOpen, close: handleClose, toggle: toggleDropdownOpen } = useDropdown();

    const triggerNode = <Button label="Click Me" onClick={toggleDropdownOpen} />;

    return (
      <Dropdown isOpen={isOpen} trigger={triggerNode} onClose={handleClose}>
        <DropdownMenu />
      </Dropdown>
    );
  })
  .add('Рендер в портале', () => {
    const { isOpen, close: handleClose, toggle: toggleDropdownOpen } = useDropdown();

    return (
      <>
        <Dropdown.Trigger id="trigger">
          <Button label="Click Me" onClick={toggleDropdownOpen} />
        </Dropdown.Trigger>
        <Dropdown portalId="trigger" portal isOpen={isOpen} onClose={handleClose}>
          <DropdownMenu />
        </Dropdown>
      </>
    );
  });
