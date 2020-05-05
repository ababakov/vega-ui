# @vega-ui/modal

Компонент рендерит React-портал и является модальным окном, которое открывается поверх основного контента.
![Модальное окно](docs/modal.png)

### Установка

```
yarn add @vega-ui/modal
```

### Пример использования

```jsx
import { Modal, useModal } from '@vega-ui/modal';

export const MyComponent = () => {
  const { isOpen, handleClose, handleOpen } = useModal();

  return (
    <>
      <Modal hasOverlay hasCloseButton closeByEsc onClose={handleClose} isOpen={isOpen}>
        <Modal.Header>
          <Text size="xs">Тестовая модалочка</Text>
        </Modal.Header>
        <Modal.Body>
          <Text>модалка модалка модалка</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button size="m" view="primary" label="Кнопочка" />
        </Modal.Footer>
      </Modal>
      <Button onClick={handleOpen}>Открыть модалку</Button>
    </>
  );
};
```

### API компонента

```ts
type ModalProps = {
  onClose: React.EventHandler<React.MouseEvent | React.KeyboardEvent>; // Метод для закрытия модального окна
  isOpen?: boolean; // Индикация того, что модального окно открыто
  hasCloseButton?: boolean; // Нужно ли рендерить крестик для закрытия
  children?: React.ReactNode;
  hasOverlay?: boolean; // Нужно ли рендерить оверлей
  onOverlayClick?: (e: React.SyntheticEvent) => void; // Метод, который вызовется по клику на оверлей (по умолчанию onClose)
  rootSelector?: string; // Селектор, в котором рендерить модальное окон (по умолчанию body)
};
```

`Modal.Header`, `Modal.Body` и `Modal.Footer` принимают пропсы `className` и `testId` для установки кастомного класса и айди для теста.

### API useModal

Хук для упрощения работы с модальным окном

Принимает на вход

```
{ initialOpen: boolean } - открыто ли модальное окно по умолчанию
```

Возвращает

```
isOpen - индикация того, что модальное окно открыто
open - метод для открытия модального окна
close - метод для закрытия модального окна
```
