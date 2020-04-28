import React, { useEffect, useRef, useState } from 'react';
import { Tabs as BaseTabs } from '@gpn-design/uikit/Tabs';
import { IconArrowLeft, IconArrowRight } from '@vega-ui/icons';
import { block } from 'bem-cn';

import useSwipeScroll from './use-scroll';

import './Tabs.css';

type BaseTabsComponent = typeof BaseTabs;

const cnTabs = block('VegaTabs');

export const Tabs: BaseTabsComponent = (props) => {
  const { size } = props;
  const [state, setState] = useState({
    isHiddenLeftButton: true,
    isHiddenRightButton: false,
  });
  const scroller = useRef<HTMLDivElement | null>(null);

  const scroll = useSwipeScroll({
    sliderRef: scroller,
  });

  const checkScroll = (): void => {
    const sc = scroller.current;

    if (!sc) {
      return;
    }

    console.log(scroll);

    setState({
      ...state,
      isHiddenLeftButton: scroll.scrollLeft === 0,
      isHiddenRightButton:
        scroll.currentRightPosition === scroll.containerWidth && scroll.containerWidth !== 0,
    });
  };

  useEffect(() => {
    checkScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScrollLeft = (): void => {
    const sc = scroller.current;

    if (!sc || sc.scrollLeft === 0) {
      return;
    }

    // sc.scrollLeft -= scroll.scrollStep;
    sc.scrollLeft -= 1033;

    checkScroll();
  };

  const handleScrollRight = (): void => {
    const sc = scroller.current;

    if (!sc) {
      return;
    }

    sc.scrollLeft += 1033;

    console.log(scroll.scrollStep);
    console.log(sc.scrollLeft);

    checkScroll();
  };

  return (
    <div className={cnTabs({ size })}>
      {!state.isHiddenLeftButton && (
        <div className={cnTabs('ScrollLeft')}>
          <button type="button" className={cnTabs('ScrollButton')} onClick={handleScrollLeft}>
            <IconArrowLeft />
          </button>
        </div>
      )}
      <div className={cnTabs('Inner')}>
        <div className={cnTabs('InnerContent')} ref={scroller}>
          <BaseTabs {...props} className={cnTabs('Native', { align: 'center' })} />
        </div>
      </div>
      {!state.isHiddenRightButton && (
        <div className={cnTabs('ScrollRight')}>
          <button type="button" className={cnTabs('ScrollButton')} onMouseDown={handleScrollRight}>
            <IconArrowRight />
          </button>
        </div>
      )}
      <span>{scroll.scrollLeft}</span>
    </div>
  );
};
