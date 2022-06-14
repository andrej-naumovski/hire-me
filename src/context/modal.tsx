import { useEventCallback } from '@mui/material';
import {
  createContext, PropsWithChildren, useMemo, useState
} from 'react';

export enum Modals {
  CHECKIN_CHILD = 'CHECKIN_CHILD',
  CHECKOUT_CHILD = 'CHECKOUT_CHILD'
}

export type ModalState = Record<Modals, {
  open: boolean;
  data: Record<string, unknown>;
}>;

export interface ModalContext {
  modalState: ModalState;
  openModal: (modal: Modals, data?: Record<string, unknown>) => void;
  closeModal: (modal: Modals) => void;
}

const defaultModalState = {
  [Modals.CHECKIN_CHILD]: {
    open: false,
    data: {}
  },
  [Modals.CHECKOUT_CHILD]: {
    open: false,
    data: {}
  }
};

export const ModalContext = createContext<ModalContext>({
  modalState: defaultModalState,
  openModal: () => {
    //
  },
  closeModal: () => {
    //
  }
});

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [modalState, setModalState] = useState(defaultModalState);

  const changeModalState = (openState: boolean) => useEventCallback((modal: Modals, data = {}) =>
    setModalState((prevState) => ({
      ...prevState,
      [modal]: {
        open: openState,
        data
      }
    })));

  const openModal = changeModalState(true);
  const closeModal = changeModalState(false);

  const contextValue =
    useMemo(() => ({ modalState, openModal, closeModal }), [modalState, openModal, closeModal]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
