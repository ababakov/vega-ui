import {
  CSSProperties,
  MouseEvent,
  TouchEvent,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

type Props = {
  findActiveElement(wrapper: HTMLDivElement): HTMLDivElement | null;
};

type IsLimits = {
  isLeftLimit: boolean;
  isRightLimit: boolean;
};

export type State = {
  dir: 'left' | 'right' | null;
  current: number;
  offset: number;
  startX: number;
  startOffset: number;
  isActive: boolean;
} & IsLimits;

type ElementWidth = { visible: number; actual: number };

export type ActionReducer = { width: ElementWidth } & (
  | { type: 'force'; offset: number }
  | { type: 'scroll'; offset: number }
  | { type: 'start' | 'move' | 'end'; x: number }
);

type WrapperProps = {
  ref: React.RefObject<HTMLDivElement>;
  style: CSSProperties;
  onTouchStart(event: TouchEvent): void;
  onTouchMove(event: TouchEvent): void;
  onTouchEnd(event: TouchEvent): void;
  onMouseDown(event: MouseEvent): void;
  onMouseMove(event: MouseEvent): void;
  onMouseUp(event: MouseEvent): void;
  onMouseLeave(): void;
};

type RootProps = {
  ref: React.RefObject<HTMLDivElement>;
  style: CSSProperties;
};

type ReturnValue = {
  getWrapperProps: () => WrapperProps;
  getRootProps: () => RootProps;
  isLeftLimit: boolean;
  isRightLimit: boolean;
  scroll(dir?: 'left' | 'right'): void;
};

export const useIsomorphicEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const clamp = (min: number, max: number) => (value: number): number =>
  Math.max(min, Math.min(value, max));

function getXFromTouchEvent(event: TouchEvent): number {
  const first = event.touches[0];

  if (first === undefined) {
    return 0;
  }

  return first.clientX;
}

function getXFromMouseEvent(event: MouseEvent): number {
  return event.pageX;
}

function getElementWidth(el: HTMLElement | null): ElementWidth {
  if (el instanceof HTMLElement) {
    return {
      visible: el.offsetWidth,
      actual: el.scrollWidth,
    };
  }

  return {
    visible: 0,
    actual: 0,
  };
}

export function movementReducer(state: State, action: ActionReducer): State {
  const { width } = action;
  const clampOffset = clamp(width.visible - width.actual, 0);

  function checkLimits(actionReducer: ActionReducer): IsLimits | undefined {
    if (actionReducer.type !== 'scroll' && actionReducer.type !== 'force') {
      return undefined;
    }
    const isRightLimit = Math.abs(actionReducer.offset) + width.visible >= width.actual - 10;
    const isLeftLimit = actionReducer.offset >= -10;

    return {
      isRightLimit,
      isLeftLimit,
    };
  }

  if (action.type === 'force') {
    return {
      ...state,
      ...checkLimits(action),
      offset: clampOffset(action.offset),
    };
  }

  if (action.type === 'scroll') {
    return {
      ...state,
      ...checkLimits(action),
      offset: clampOffset(action.offset),
    };
  }

  if (action.type === 'start') {
    return {
      ...state,
      startOffset: state.offset,
      current: action.x,
      startX: action.x,
      isActive: true,
    };
  }

  if (action.type === 'end') {
    return {
      ...state,
      dir: null,
      current: action.x,
      startOffset: state.offset,
      isActive: false,
    };
  }

  const current = action.x;
  const prev = state.current;
  const dir = prev - current < 0 ? 'right' : 'left';

  const delta = current - state.startX;
  const offset = clampOffset(state.startOffset + delta);

  const isRightLimit = Math.abs(offset) + width.visible >= width.actual - 10;
  const isLeftLimit = offset >= -10;

  return {
    ...state,
    current,
    offset,
    dir,
    isLeftLimit,
    isRightLimit,
  };
}

let isMouseDragStart: boolean;

export function useDraggableContainer({ findActiveElement }: Props): ReturnValue {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);

  const [movement, updateMovement] = useReducer(movementReducer, {
    dir: null,
    current: 0,
    offset: 0,
    startX: 0,
    startOffset: 0,
    isActive: false,
    isLeftLimit: true,
    isRightLimit: false,
  });

  useIsomorphicEffect(() => {
    const wrapper = wrapperRef.current;

    if (wrapper instanceof HTMLElement) {
      const element = findActiveElement(wrapper);

      if (element !== activeElement) {
        setActiveElement(element);
      }

      wrapper.style.transform = `translate3D(${movement.offset}px, 0 ,0)`;
    }
  });

  useIsomorphicEffect(() => {
    if (movement.isActive) {
      return;
    }

    const root = rootRef.current;
    const wrapper = wrapperRef.current;
    const active = activeElement;

    if (
      root instanceof HTMLElement &&
      wrapper instanceof HTMLElement &&
      active instanceof HTMLElement
    ) {
      const rootBounds = root.getBoundingClientRect();
      const { left, width } = active.getBoundingClientRect();
      const activeCenterOffsetLeft = left - rootBounds.left + width / 2;
      const offset = movement.offset + (activeCenterOffsetLeft - rootBounds.width / 2) * -1;

      if (offset === movement.offset) {
        return;
      }

      updateMovement({ type: 'force', offset, width: getElementWidth(wrapper) });
    }
  }, [activeElement]);

  useIsomorphicEffect(() => {
    function listener(): void {
      if (!wrapperRef.current) return;

      const width = getElementWidth(wrapperRef.current);
      if (width.actual !== 0 && width.actual === width.visible && movement.offset !== 0) {
        updateMovement({ type: 'force', offset: 0, width });
      }
    }

    window.addEventListener('resize', listener);

    return (): void => {
      window.removeEventListener('resize', listener);
    };
  }, [movement.offset]);

  function getWrapperProps(): WrapperProps {
    return {
      ref: wrapperRef,
      style: {
        transition: 'transform .3s ease-in-out',
      },
      onTouchStart(event: TouchEvent): void {
        updateMovement({
          type: 'start',
          x: getXFromTouchEvent(event),
          width: getElementWidth(wrapperRef.current),
        });
      },
      onTouchMove(event: TouchEvent): void {
        updateMovement({
          type: 'move',
          x: getXFromTouchEvent(event),
          width: getElementWidth(wrapperRef.current),
        });
      },
      onTouchEnd(event: TouchEvent): void {
        updateMovement({
          type: 'end',
          x: getXFromTouchEvent(event),
          width: getElementWidth(wrapperRef.current),
        });
      },
      onMouseDown(event: MouseEvent): void {
        isMouseDragStart = true;
        updateMovement({
          type: 'start',
          x: getXFromMouseEvent(event),
          width: getElementWidth(wrapperRef.current),
        });
      },
      onMouseMove(event: MouseEvent): void {
        if (isMouseDragStart) {
          updateMovement({
            type: 'move',
            x: getXFromMouseEvent(event),
            width: getElementWidth(wrapperRef.current),
          });
        }
      },
      onMouseUp(event: MouseEvent): void {
        isMouseDragStart = false;
        updateMovement({
          type: 'end',
          x: getXFromMouseEvent(event),
          width: getElementWidth(wrapperRef.current),
        });
      },
      onMouseLeave(): void {
        isMouseDragStart = false;
      },
    };
  }

  function scroll(dir: 'left' | 'right'): void {
    const wrapper = wrapperRef.current;

    if (!wrapper) {
      return;
    }

    const width = getElementWidth(wrapper);

    const rightPosition = Math.abs(movement.offset) + width.visible;

    const offsetLeft =
      Math.abs(movement.offset) > width.visible ? (movement.offset + width.visible) * -1 : 0;
    const offsetRight =
      rightPosition + width.visible > width.actual ? width.actual % width.visible : width.visible;

    console.log(offsetLeft);

    const offset = dir === 'left' ? offsetLeft : offsetRight * -1;

    updateMovement({
      type: 'scroll',
      offset,
      width: getElementWidth(wrapperRef.current),
    });
  }

  function getRootProps(): RootProps {
    return {
      ref: rootRef,
      style: {
        overflowX: 'hidden',
      },
    };
  }

  return {
    getRootProps,
    getWrapperProps,
    isLeftLimit: movement.isLeftLimit,
    isRightLimit: movement.isRightLimit,
    scroll,
  };
}
