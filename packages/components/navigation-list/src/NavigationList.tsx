import React, { useEffect, useRef } from 'react';
import { cn } from '@gpn-design/uikit/__internal__/src/utils/bem';

import './NavigationList.css';

const cnNavigationList = cn('VegaNavigationList');
const cnNavigationListItem = cn('VegaNavigationListItem');
const cnNavigationListDelimiter = cn('VegaNavigationListDelimiter');

export type ListProps = {
  ordered?: boolean;
  start?: number;
  className?: string;
};

export const NavigationList: React.FC<ListProps> = ({
  ordered = false,
  start = 0,
  className,
  children,
}) => {
  const Tag = ordered ? 'ol' : 'ul';
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (ordered && ref.current) {
      ref.current.style.setProperty('--vega-navigation-list-counter-start', `${start}`);
    }
  }, [ordered, start]);

  return (
    <Tag ref={ref} className={cnNavigationList({ ordered }, [className])}>
      {children}
    </Tag>
  );
};

export type ItemProps = {
  active?: boolean;
  className?: string;
  onClick?: (event: React.SyntheticEvent) => void;
  children: React.ReactNode;
};

export const NavigationListItem: React.FC<ItemProps> = ({
  active,
  className,
  onClick,
  children,
}) => {
  const handleClick = (event: React.SyntheticEvent): void => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <li
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyUp={(event): void => (event.key === 'Enter' ? handleClick(event) : undefined)}
      className={cnNavigationListItem({ active }, [className])}
    >
      {children}
    </li>
  );
};

export type DelimiterProps = {
  resetCounter?: boolean;
};

export const NavigationListDelimiter: React.FC<DelimiterProps> = ({ resetCounter = false }) => {
  return <div className={cnNavigationListDelimiter({ resetCounter })} />;
};
