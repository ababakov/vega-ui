import React, { useEffect, useState } from 'react';
import { Tabs as BaseTabs } from '@gpn-design/uikit/Tabs';
import { IconArrowLeft, IconArrowRight } from '@vega-ui/icons';
import { block } from 'bem-cn';

import { useDraggableTab } from './use-draggeble-tab';

import './Tabs.css';

type BaseTabsComponent = typeof BaseTabs;

const cnTabs = block('VegaTabs');

export const Tabs: BaseTabsComponent = (props) => {
  const { size } = props;
  const [state, setState] = useState({
    isHiddenLeftButton: true,
    isHiddenRightButton: false,
  });

  const draggableTab = useDraggableTab({
    findActiveElement(wrapper: HTMLElement) {
      return wrapper.querySelector('.Tabs-Tab_active');
    },
  });

  // const checkScroll = (): void => {
  //   const sc = scroller.current;

  //   if (!sc) {
  //     return;
  //   }

  //   console.log(state);
  //   console.log(scroll);

  //   setState({
  //     ...state,
  //     isHiddenLeftButton: scroll.scrollLeft === 0,
  //     isHiddenRightButton:
  //       scroll.currentRightPosition === scroll.containerWidth && scroll.containerWidth !== 0,
  //   });
  // };

  // useEffect(() => {
  //   checkScroll();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const handleScrollLeft = (): void => {
  //   const sc = scroller.current;

  //   if (!sc || sc.scrollLeft === 0) {
  //     return;
  //   }

  //   // sc.scrollLeft -= scroll.scrollStep;
  //   sc.scrollLeft -= 1033;

  //   checkScroll();
  // };

  // const handleScrollRight = (): void => {
  //   const sc = scroller.current;

  //   if (!sc) {
  //     return;
  //   }

  //   sc.scrollLeft += 1033;

  //   checkScroll();
  // };

  return (
    <div className={cnTabs({ size })}>
      {!state.isHiddenLeftButton && (
        <div className={cnTabs('ScrollLeft')}>
          <button type="button" className={cnTabs('ScrollButton')}>
            <IconArrowLeft />
          </button>
        </div>
      )}
      <div className={cnTabs('Inner')} {...draggableTab.getRootProps()}>
        <div className={cnTabs('InnerContent')} {...draggableTab.getWrapperProps()}>
          <BaseTabs {...props} className={cnTabs('Native', { align: 'center' })} />
        </div>
      </div>
      {!state.isHiddenRightButton && (
        <div className={cnTabs('ScrollRight')}>
          <button type="button" className={cnTabs('ScrollButton')}>
            <IconArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};
