import { useCallback, useEffect } from 'react';

import { HandledEventsType, Handler, PossibleEvent } from './types';

type Opts = {
  keyevent?: HandledEventsType;
  element?: Document | Element;
};

export const useKey = (
  key: string | number,
  callback: Handler,
  { keyevent = 'keyup', element = document }: Opts = {},
): void => {
  const handleEvent = useCallback(
    (event: PossibleEvent): void => {
      if ([event.which, event.key, event.code].includes(key)) {
        callback(event);
      }
    },
    [callback, key],
  );

  useEffect(() => {
    element.addEventListener(keyevent, handleEvent as EventListener);
    return (): void => {
      element.removeEventListener(keyevent, handleEvent as EventListener);
    };
  }, [handleEvent, keyevent, element]);
};
