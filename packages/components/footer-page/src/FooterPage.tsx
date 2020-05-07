import React from 'react';
import { block } from 'bem-cn';

import './FooterPage.css';

const cnFooterPage = block('VegaFooterPage');

export type FooterPageProps = {
  className?: string;
  testId?: string;
};

export const FooterPage: React.FC<FooterPageProps> = ({
  className,
  testId = 'VegaFooterPage',
  children,
}) => {
  return (
    <div className={cnFooterPage({}).mix(className)} data-testid={testId}>
      {children}
    </div>
  );
};
