import { Dialog } from '@mui/material';
import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { Modals } from '../../context/modal';
import useModalState from '../../hooks/useModalState';

interface ModalProps {
  id: Modals;
}

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, id }: PropsWithChildren<ModalProps>) => {
  const { open, closeModal } = useModalState(id);

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <Dialog fullWidth onClose={closeModal} open={open ?? false}>
      {children}
    </Dialog>,
    modalRoot
  );
};

export default Modal;
