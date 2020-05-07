# @vega-ui/dropdown

Компонент является элементом, который выпадает из trigger-элемента

![Дропдаун](docs/dropdown.png)

### Установка

```
yarn add @vega-ui/dropdown
```

### Пример использования

```jsx
import { Dropdown, useDropdown } from '@vega-ui/dropdown';

export const MyComponent = () => {
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
      <Dropdown.Menu>
        <Dropdown.Item>
          <Dropdown.Link>First</Dropdown.Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Dropdown.Link>Second</Dropdown.Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
```

### Пример использования с React-порталом

```jsx
<>
  <Dropdown.Trigger id="trigger">
    <Button label="Click Me" onClick={toggleDropdownOpen} />
  </Dropdown.Trigger>
  <Dropdown portalId="trigger" portal isOpen={isOpen} onClose={handleClose}>
    <DropdownMenu />
  </Dropdown>
</>
```

### API компонента

```ts
type DropdownProps = {
  trigger?: React.ReactNode; // Компонент-триггер для дропдауна
  onClose: (e?: MouseEvent | TouchEvent) => void; // Метод для закрытия дропдауна
  children?: React.ReactNode;
  isOpen: boolean; // Индикация того, что дропдаун открыт
  className?: string;
  portal?: boolean; //Должен ли компонент рендерится в портале
  portalId?: string; // id для контейнера-порталf
};

type DropdownItemProps = {
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType; // Элемент, который будет рендериться на месте Item. По умолчанию <li></li>
  onClick?: (e: MouseEvent) => void;
};

type DropdownMenuProps = {
  className?: string;
  children?: React.ReactNode;
};

type DropdownLinkProps = {
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
  isActive?: boolean; // является ли эта ссылка активной
};

type DropdownTriggerProps = {
  id: string;
  children?: React.ReactNode;
  className?: string;
};
```

Если передается проп `portal`, то проп trigger игнорируется. Для триггера используйте компонент `Dropdown.Trigger`.

### API useDropdown

Хук для упрощения работы с дропдауном

Возвращает

```ts
isOpen: boolean - индикация того, что дропдаун открыт
toggle: () => void - метод для изменения состояния дропдауна
close: () => void - метод для закрытия дропдауна
open: () => void - метод для открытия дропдауна

```
