# @vega-ui/navigation-list

Компонент "Навигация"

![Навигация](docs/navigation-list.png)

### Установка

```
yarn add @vega-ui/navigation-list
```

### Примеры использования

#### Обычный

```jsx
import { NavigationList, NavigationListItem } from '@vega-ui/navigation-list';

export const MyComponent = () => {
  const active = true;

  return (
    <NavigationList>
        <NavigationListItem active={active}>
            Описание проекта
        <NavigationListItem>
        <NavigationListItem>Участники</NavigationListItem>
        <NavigationListItem>Связанные документы и файлы</NavigationListItem>
    </NavigationList>
  );
};
```

#### С иконкой

Обратите внимание, что не стоит использовать свойство `justify-content: space-between` для разделения текста и элемента иконки. При включенной нумерации (`ordered`) числа для нумерации добавляются с помощью псевдоэлемента `::before` и как следствие, будут считаться третьим `flex` элементом.

```jsx
import { NavigationList, NavigationListItem } from '@vega-ui/navigation-list';
import { IconCheck } from '@vega-ui/icons';

export const MyComponent = () => {
  const active = true;

  return (
    <NavigationList>
        <NavigationListItem className="withIcon">
            Описание проекта
            <IconCheck size="s" view="success" className="icon" />
        <NavigationListItem>
        <NavigationListItem active={active}>Участники</NavigationListItem>
        <NavigationListItem>Связанные документы и файлы</NavigationListItem>
    </NavigationList>
  );
};
```

```css
.withIcon {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.icon {
  margin-left: auto;
}
```

#### С разделителем

```jsx
import {
  NavigationList,
  NavigationListItem,
  NavigationListDelimiter,
} from '@vega-ui/navigation-list';

export const MyComponent = () => {
  const active = true;

  return (
    <NavigationList>
      <NavigationListItem active={active}>Описание проекта</NavigationListItem>
      <NavigationListItem>Участники</NavigationListItem>
      <NavigationListItem>Связанные документы и файлы</NavigationListItem>
      <NavigationListDelimiter />
      <NavigationListItem>Похожие проекты</NavigationListItem>
      <NavigationListItem>Описание</NavigationListItem>
    </NavigationList>
  );
};
```

### API

```ts
type NavigationListProps = {
  ordered?: boolean; // Добавляет нумерацию пунктов
  start?: number; // Число с которого начинать нумерацию
  className?: string;
};

type NavigationListItemProps = {
  active?: boolean; // Индикатор активного элемента
  className?: string;
  onClick?: (event: React.SyntheticEvent) => void;
  children: React.ReactNode;
};

type NavigationListDelimiterProps = {
  resetCounter?: boolean; // Прерывает сплошную нумерацию, следующие элементы будут нумероваться с 1
};
```
