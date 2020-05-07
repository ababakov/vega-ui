import React from 'react';
import { Button } from '@gpn-design/uikit/Button';
import { Text } from '@gpn-design/uikit/Text';
import { storiesOf } from '@storybook/react';

import { Dropdown } from './Dropdown';
import { useDropdown } from './use-dropdown';

storiesOf('ui/Dropdown', module).add('Dropdown', () => {
  const { isOpen, close: handleClose, toggle: toggleDropdownOpen } = useDropdown();
  const [active, setActive] = React.useState('first');

  const triggerNode = <Button label="Click Me" onClick={toggleDropdownOpen} />;

  return (
    <Dropdown isOpen={isOpen} trigger={triggerNode} onClose={handleClose}>
      <Dropdown.Menu>
        <Dropdown.Item onClick={(): void => setActive('first')}>
          <Dropdown.Link isActive={active === 'first'}>
            <Text>First</Text>
          </Dropdown.Link>
        </Dropdown.Item>
        <Dropdown.Item onClick={(): void => setActive('second')}>
          <Dropdown.Link isActive={active === 'second'}>
            <Text>Second</Text>
          </Dropdown.Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
});
