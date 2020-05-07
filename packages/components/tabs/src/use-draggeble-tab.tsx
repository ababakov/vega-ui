import {
  MouseEvent,
  TouchEvent,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
// import gsap from 'gsap';

type Props = {
  findActiveElement(wrapper: HTMLDivElement): HTMLDivElement | null;
};

type State = {
  dir: 'left' | 'right' | null;
  current: number;
  offset: number;
  startX: number;
  startOffset: number;
  isActive: boolean;
};

type ElementWidth = { visible: number; actual: number };

type ActionReducer = { width: ElementWidth } & (
  | { type: 'force'; offset: number }
  | { type: 'start' | 'move' | 'end'; x: number }
);

type WrapperProps = {
  ref: React.RefObject<HTMLDivElement>;
  onTouchStart(event: TouchEvent): void;
  onTouchMove(event: TouchEvent): void;
  onTouchEnd(event: TouchEvent): void;
  onMouseDown(event: MouseEvent): void;
  onMouseMove(event: MouseEvent): void;
  onMouseUp(event: MouseEvent): void;
};

type RootProps = {
  ref: React.RefObject<HTMLDivElement>;
  style: {
    overflowX: 'hidden';
  };
};

type ReturnValue = {
  getWrapperProps: () => WrapperProps;
  getRootProps: () => RootProps;
};

export const useIsomorphicEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// function clamp(min: number, max: number) {
//   return (value: number) => {
//     return Math.max(max, Math.min(value, min));
//   };
// }

const clamp = (min: number, max: number) => (value: number) => Math.max(min, Math.min(value, max));

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

  if (action.type === 'force') {
    return {
      ...state,
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

  console.log(state);

  return {
    ...state,
    current,
    offset,
    dir,
  };
}

export function useDraggableTab({ findActiveElement }: Props): ReturnValue {
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
  });

  useIsomorphicEffect(() => {
    const wrapper = wrapperRef.current;

    if (wrapper instanceof HTMLElement) {
      const element = findActiveElement(wrapper);

      if (element !== activeElement) {
        setActiveElement(element);
      }

      console.log(`translate3D(${movement.offset}, 0 ,0)`);

      // wrapper.scrollLeft = movement.offset;
      wrapper.style.transform = `translate3D(${movement.offset}, 0 ,0)`;
      // gsap.to(wrapper, { duration: 0.2, x: movement.offset });
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
        updateMovement({
          type: 'start',
          x: getXFromMouseEvent(event),
          width: getElementWidth(wrapperRef.current),
        });
      },
      onMouseMove(event: MouseEvent): void {
        updateMovement({
          type: 'move',
          x: getXFromMouseEvent(event),
          width: getElementWidth(wrapperRef.current),
        });
      },
      onMouseUp(event: MouseEvent): void {
        updateMovement({
          type: 'end',
          x: getXFromMouseEvent(event),
          width: getElementWidth(wrapperRef.current),
        });
      },
    };
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
  };
}

// import { useEffect, useState } from 'react';

// type ScrollData = {
//   hasSwiped: boolean;
//   scrollLeft: number;
//   currentRightPosition: number;
//   containerWidth: number;
//   scrollStep: number;
// };

// function useSwipeScroll({
//   sliderRef,
//   momentumVelocity = 0.9,
// }: {
//   sliderRef: React.RefObject<HTMLDivElement>;
//   momentumVelocity?: number;
// }): ScrollData {
//   const [state, setState] = useState({
//     hasSwiped: false,
//   });

//   if (!sliderRef.current) {
//     return undefined;
//   }
//   const pos = {
//     scrollLeft: !sliderRef.current ? sliderRef.current.scrollLeft : 0,
//     scrollStep: 0,
//     currentRightPosition: 0,
//     containerWidth: sliderRef.current?.scrollWidth || 0,
//   };

//   // setState({
//   //   ...state,
//   //   scrollLeft: slider.scrollLeft,
//   //   scrollStep: slider.clientWidth,
//   //   currentRightPosition: slider.scrollLeft + slider.clientWidth,
//   //   containerWidth: slider.scrollWidth,
//   // });

//   const init = useCallback(() => {
//     const slider = sliderRef.current;

//     if (!slider) {
//       return undefined;
//     }

//     console.log(state);
//     console.log({ scrollStep: slider.clientWidth });

//     let isDown = false;
//     let startX: number;
//     let { scrollLeft } = state;

//     // Momentum
//     let velX = 0;
//     let momentumID: number;

//     function cancelMomentumTracking(): void {
//       cancelAnimationFrame(momentumID);
//     }

//     function momentumLoop(): void {
//       if (!slider) {
//         return;
//       }
//       slider.scrollLeft += velX;
//       velX *= momentumVelocity;

//       setState({
//         ...state,
//         scrollLeft: slider.scrollLeft,
//         scrollStep: slider.clientWidth,
//         currentRightPosition: slider.scrollLeft + slider.clientWidth,
//         containerWidth: slider.scrollWidth,
//       });

//       if (Math.abs(velX) > 0.5) {
//         momentumID = requestAnimationFrame(momentumLoop);
//       }
//     }

//     function beginMomentumTracking(): void {
//       cancelMomentumTracking();
//       momentumID = requestAnimationFrame(momentumLoop);
//     }

//     function mousedown(e: MouseEvent): void {
//       if (!slider) {
//         return;
//       }
//       isDown = true;
//       startX = e.pageX - slider.offsetLeft;
//       scrollLeft = slider.scrollLeft;
//       cancelMomentumTracking();
//     }

//     function mouseleave(): void {
//       isDown = false;
//     }

//     function mouseup(): void {
//       isDown = false;
//       beginMomentumTracking();
//       setTimeout(() => setState({ ...state, hasSwiped: false }), 0);
//     }

//     function mousemove(e: MouseEvent): void {
//       if (!isDown || !slider) return;

//       e.preventDefault();

//       const x = e.pageX - slider.offsetLeft;
//       const walk = (x - startX) * 3; // scroll-fast
//       const prevScrollLeft = slider.scrollLeft;

//       slider.scrollLeft = scrollLeft - walk;
//       velX = slider.scrollLeft - prevScrollLeft;

//       if (slider.scrollLeft - prevScrollLeft && !state.hasSwiped) {
//         setState({ ...state, hasSwiped: true });
//       }
//     }

//     function wheel(): void {
//       cancelMomentumTracking();
//     }

//     slider.addEventListener('mousedown', mousedown);
//     slider.addEventListener('mouseleave', mouseleave);
//     slider.addEventListener('mouseup', mouseup);
//     slider.addEventListener('mousemove', mousemove);
//     slider.addEventListener('wheel', wheel);

//     return (): void => {
//       slider.removeEventListener('mousedown', mousedown);
//       slider.removeEventListener('mouseleave', mouseleave);
//       slider.removeEventListener('mouseup', mouseup);
//       slider.removeEventListener('mousemove', mousemove);
//       slider.removeEventListener('wheel', wheel);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     init();
//   }, []);

//   // function scroll(): void {
//   //   const slider = !sliderRef.current;
//   //   if (!slider) return;

//   //   // const x = e.pageX - slider.offsetLeft;
//   //   const walk = (state.scrollStep - state.scrollLeft) * 3; // scroll-fast
//   //   const prevScrollLeft = state.scrollLeft;

//   //   slider.scrollLeft = state.scrollLeft - walk;

//   //   velX = slider.scrollLeft - prevScrollLeft;

//   //   if (slider.scrollLeft - prevScrollLeft && !hasSwiped) {
//   //     setHasSwiped(true);
//   //   }
//   // }

//   return state;
// }

// export default useSwipeScroll;
