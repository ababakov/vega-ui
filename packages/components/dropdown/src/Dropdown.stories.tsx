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
  } = useDropdown();

  const triggerNode = <Button label="Click Me" onClick={toggleDropdownOpen} />;

  return (
    <Dropdown isOpen={isOpen} trigger={triggerNode} onClose={handleDropdownClose}>
      <Dropdown.Menu activeName={activeName} onChangeActive={handleChangeActiveName}>
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
