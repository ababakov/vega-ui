import React, { useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@vega-ui/button';
import { useKey, useOnClickOutside, usePortalDomNode } from '@vega-ui/hooks';
import { IconClose } from '@vega-ui/icons';

import { cnModal } from './helpers/cn-modal';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';

import './Modal.css';

type CloseEvent = KeyboardEvent | React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent;

type DivProps = JSX.IntrinsicElements['div'];

export type ModalProps = {
  onClose: (e: CloseEvent) => void;
  isOpen?: boolean;
  hasCloseButton?: boolean;
  children?: React.ReactNode;
  hasOverlay?: boolean;
  onOverlayClick?: (e: React.SyntheticEvent) => void;
  rootSelector?: string;
  className?: string;
};

interface TypeModal<T> extends React.FC<T>, DivProps {
  Header: typeof ModalHeader;
  Footer: typeof ModalFooter;
  Body: typeof ModalBody;
}

const ESCAPE_CODE = 'Escape';

export const Modal: Modal<ModalProps> = (props) => {
  const {
    hasCloseButton,
    onClose,
    children,
    onOverlayClick: handleOverlayClick,
    isOpen,
    hasOverlay,
    className,
    ...rest
  } = props;
  const rootSelector: string = props.rootSelector || 'body';
  const portal = usePortalDomNode(rootSelector);
  const ref = useRef<HTMLDivElement | null>(null);
  const onOverlayClick = handleOverlayClick ?? onClose;

  const onClickOutside = useCallback(
    (e: CloseEvent): void => {
      onClose(e);
    },
    [onClose],
  );

  useOnClickOutside({ ref, handler: onClickOutside });

  const onCloseByEsc = useCallback(
    (e: CloseEvent) => {
      onClose(e);
    },
    [onClose],
  );

  useKey(ESCAPE_CODE, onCloseByEsc, { keyevent: 'keydown' });

  if (!portal || !isOpen) {
    return null;
  }

  return createPortal(
    <>
      <div
        {...rest}
        aria-modal="true"
        role="dialog"
        ref={ref}
        className={cnModal('Root').mix(className)}
      >
        {hasCloseButton && (
          <Button
            aria-label="Кнопка закрытия модального окна"
            className={cnModal('CloseButton').toString()}
            type="button"
            view="ghost"
            onClick={onClose}
            onlyIcon
            iconLeft={IconClose}
            iconSize="s"
          />
        )}
        {children}
      </div>
      {hasOverlay && (
        <button
          aria-label="Оверлей модального окна"
          type="button"
          onClick={onOverlayClick}
          className={cnModal('Overlay')}
        />
      )}
    </>,
    portal,
  );
};

Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
Modal.Body = ModalBody;
