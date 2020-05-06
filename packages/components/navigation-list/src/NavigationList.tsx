import React, { useEffect, useRef } from 'react';
import { block } from 'bem-cn';

import './NavigationList.css';

const cnNavigationList = block('VegaNavigationList');
const cnNavigationListItem = block('VegaNavigationListItem');
const cnNavigationListDelimiter = block('VegaNavigationListDelimiter');

export type NavigationListProps = {
  ordered?: boolean;
  start?: number;
  className?: string;
};

export const NavigationList: React.FC<NavigationListProps> = ({
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
    <Tag ref={ref} className={cnNavigationList({ ordered }).mix(className)}>
      {children}
    </Tag>
  );
};

export type NavigationListItemProps = {
  active?: boolean;
  className?: string;
  onClick?: (event: React.SyntheticEvent) => void;
};

export const NavigationListItem: React.FC<NavigationListItemProps> = ({
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
      className={cnNavigationListItem({ active }).mix(className)}
    >
      {children}
    </li>
  );
};

export type NavigationListDelimiterProps = {
  resetCounter?: boolean;
};

export const NavigationListDelimiter: React.FC<NavigationListDelimiterProps> = ({
  resetCounter = false,
}) => {
  return <div className={cnNavigationListDelimiter({ resetCounter })} />;
};
