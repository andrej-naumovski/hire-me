import { useContext } from 'react';
import { ModalContext, Modals } from '../context/modal';

const useModalState = <TData extends Record<string, unknown>>(modal: Modals) => {
  const { modalState, openModal, closeModal } = useContext(ModalContext);

  const currentModalState = modalState[modal];
  const currentModalStateData = currentModalState.data as TData;
  const openCurrentModal = (data?: TData) => openModal(modal, data);
  const closeCurrentModal = () => closeModal(modal);

  return {
    open: currentModalState.open,
    data: currentModalStateData,
    openModal: openCurrentModal,
    closeModal: closeCurrentModal
  };
};

export default useModalState;
