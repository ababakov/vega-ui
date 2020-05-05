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
};
```

### API компонента

```ts
type DropdownProps = {
  trigger?: React.ReactNode; // Компонент - триггер для дропдауна
  onClose: (e?: MouseEvent | TouchEvent) => void; // Метод для закрытия дропдауна
  children?: React.ReactNode;
  isOpen: boolean; // Индикация того, что дропдаун открыт
  className?: string;
  testId?: string;
};

type DropdownItemProps = {
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType; // Элемент, который будет рендериться на месте Item. По умолчанию <a></a>
  onClick?: (e: LiMouseEvent) => void;
  name: string; // Имя элемента, по которому будет вычислять активный ли это элемент
  testId?: string;
};

type DropdownMenuProps = {
  className?: string;
  children?: React.ReactNode;
  activeName: string; // Имя активного элемента
  onChangeActive?: (name: string) => void; // Метод для изменения активного элемента
  testId?: string;
};
```

### API useDropdown

Хук для упрощения работы с дропдауном

Принимает на вход

```
{ defaultActiveName: string } - активный элемент в меню по умолчанию

Возвращает

```

isOpen: boolean - индикация того, что дропдаун открыт
activeName: string - активный элемент в меню
handleChangeActiveName: (name: string) => void - метод для изменения активного элемента меню
toggleDropdownOpen: () => void - метод для изменения состояния дропдауна
handleDropdownClose: () => void - метод для закрытия дропдауна
handleDropdownOpen: () => void - метод для открытия дропдауна

```

```
