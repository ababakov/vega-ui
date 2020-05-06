import React from 'react';
import { Button } from '@gpn-design/uikit/Button';
import { Text } from '@gpn-design/uikit/Text';
import { storiesOf } from '@storybook/react';

import { Dropdown } from './Dropdown';
import { useDropdown } from './use-dropdown';

storiesOf('ui/Dropdown', module).add('Dropdown', () => {
  const {
    isOpen,
    handleChangeActiveName,
    handleDropdownClose,
    toggleDropdownOpen,
    activeName,
  } = useDropdown({ defaultActiveName: 'first' });

  const triggerNode = <Button label="Click Me" onClick={toggleDropdownOpen} />;

  return (
    <Dropdown isOpen={isOpen} trigger={triggerNode} onClose={handleDropdownClose}>
      <Dropdown.Menu activeName={activeName} onChangeActive={handleChangeActiveName}>
        <Dropdown.Item>
          <Dropdown.Link name="first">
            <Text>First</Text>
          </Dropdown.Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Dropdown.Link name="second">
            <Text>Second</Text>
          </Dropdown.Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
});
