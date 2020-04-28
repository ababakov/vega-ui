import { useCallback, useEffect, useState } from 'react';

type ScrollData = {
  hasSwiped: boolean;
  scrollLeft: number;
  currentRightPosition: number;
  containerWidth: number;
  scrollStep: number;
};

function useSwipeScroll({
  sliderRef,
  momentumVelocity = 0.9,
}: {
  sliderRef: React.RefObject<HTMLDivElement>;
  momentumVelocity?: number;
}): ScrollData {
  const [hasSwiped, setHasSwiped] = useState(false);
  const [state, setState] = useState({
    scrollLeft: 0,
    scrollStep: 0,
    currentRightPosition: 0,
    containerWidth: sliderRef.current?.scrollWidth || 0,
  });

  const init = useCallback((): void => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    let isDown = false;
    let startX: number;
    let { scrollLeft } = state;

    // Momentum
    let velX = 0;
    let momentumID: number;

    function cancelMomentumTracking(): void {
      cancelAnimationFrame(momentumID);
    }

    function momentumLoop(): void {
      if (!slider) {
        return;
      }
      slider.scrollLeft += velX;
      velX *= momentumVelocity;
      setState({
        ...state,
        scrollLeft: slider.scrollLeft,
        scrollStep: slider.clientWidth,
        currentRightPosition: slider.scrollLeft + slider.clientWidth,
        containerWidth: slider.scrollWidth,
      });
      if (Math.abs(velX) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop);
      }
    }

    function beginMomentumTracking(): void {
      cancelMomentumTracking();
      momentumID = requestAnimationFrame(momentumLoop);
    }

    function mousedown(e: MouseEvent): void {
      if (!slider) {
        return;
      }
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      cancelMomentumTracking();
    }

    function mouseleave(): void {
      isDown = false;
    }

    function mouseup(): void {
      isDown = false;
      beginMomentumTracking();
      setTimeout(() => setHasSwiped(false), 0);
    }

    function mousemove(e: MouseEvent): void {
      if (!isDown || !slider) return;

      e.preventDefault();

      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; // scroll-fast
      const prevScrollLeft = slider.scrollLeft;

      slider.scrollLeft = scrollLeft - walk;
      velX = slider.scrollLeft - prevScrollLeft;

      if (slider.scrollLeft - prevScrollLeft && !hasSwiped) {
        setHasSwiped(true);
      }
    }

    function wheel(): void {
      cancelMomentumTracking();
    }

    slider.addEventListener('mousedown', mousedown);
    slider.addEventListener('mouseleave', mouseleave);
    slider.addEventListener('mouseup', mouseup);
    slider.addEventListener('mousemove', mousemove);
    slider.addEventListener('wheel', wheel);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function scroll(): void {
  //   const slider = !sliderRef.current;
  //   if (!slider) return;

  //   // const x = e.pageX - slider.offsetLeft;
  //   const walk = (state.scrollStep - state.scrollLeft) * 3; // scroll-fast
  //   const prevScrollLeft = state.scrollLeft;

  //   slider.scrollLeft = state.scrollLeft - walk;

  //   velX = slider.scrollLeft - prevScrollLeft;

  //   if (slider.scrollLeft - prevScrollLeft && !hasSwiped) {
  //     setHasSwiped(true);
  //   }
  // }

  return {
    hasSwiped,
    ...state,
  };
}

export default useSwipeScroll;
