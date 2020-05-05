import React from 'react';

import '@testing-library/jest-dom';

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children }) => children);
  const FakeCSSTransition = jest.fn((props) =>
    props.in ? <FakeTransition>{props.children}</FakeTransition> : null,
  );
  return { CSSTransition: FakeCSSTransition, Transition: FakeTransition };
});
