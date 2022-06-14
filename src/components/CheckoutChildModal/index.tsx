import {
  Button, DialogActions, DialogTitle
} from '@mui/material';
import { useCallback } from 'react';
import { Modals } from '../../context/modal';
import useEventWithErrorHandler from '../../hooks/useEventWithErrorHandler';
import useModalState from '../../hooks/useModalState';
import useCheckoutChild from '../ChildrenList/hooks/useCheckoutChild';
import Modal from '../Modal';

interface CheckoutChildModalProps {
  showErrorMessage: (message: string) => void;
}

const CheckoutChildModal = ({ showErrorMessage }: CheckoutChildModalProps) => {
  const { data: { childId }, closeModal } =
    useModalState<Record<string, string>>(Modals.CHECKOUT_CHILD);

  const { mutateAsync: checkoutChildMutate } = useCheckoutChild();

  const checkoutChild = useEventWithErrorHandler(checkoutChildMutate, showErrorMessage);

  const handleConfirm = useCallback(async () => {
    await checkoutChild(childId);

    closeModal();
  }, [childId, closeModal]);

  if (!childId) {
    return null;
  }

  return (
    <Modal id={Modals.CHECKOUT_CHILD}>
      <DialogTitle>Checkout child</DialogTitle>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={handleConfirm} variant="contained">Checkout</Button>
      </DialogActions>
    </Modal>
  );
};

export default CheckoutChildModal;
