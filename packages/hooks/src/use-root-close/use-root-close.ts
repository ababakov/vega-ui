import { useKey } from '../use-key';
import { useOnClickOutside } from '../use-on-click-outside';

const escapeKeyCode = 'Escape';

export type PossibleCloseEvent = MouseEvent | KeyboardEvent | TouchEvent;

export function useRootClose(
  ref: React.RefObject<HTMLElement>,
  onRootClose: (e: PossibleCloseEvent) => void,
): void {
  useOnClickOutside({ ref, handler: onRootClose });
  useKey(escapeKeyCode, onRootClose);
}
