import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Button, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useCallback, useState } from 'react';
import TimePicker from '@mui/lab/TimePicker';
import { Modals } from '../../context/modal';
import useEventWithErrorHandler from '../../hooks/useEventWithErrorHandler';
import useModalState from '../../hooks/useModalState';
import useCheckinChild from '../ChildrenList/hooks/useCheckinChild';
import Modal from '../Modal';
import { getTimeFromDateObject } from '../../utils/date';

interface CheckinChildModalProps {
  showErrorMessage: (message: string) => void;
}

const CheckinChildModal = ({ showErrorMessage }: CheckinChildModalProps) => {
  const { data: { childId }, closeModal } =
    useModalState<Record<string, string>>(Modals.CHECKIN_CHILD);

  const [pickupTime, setPickupTime] = useState<Date | null>(null);

  const { mutateAsync: checkinChildMutate } = useCheckinChild();

  const checkinChild = useEventWithErrorHandler(checkinChildMutate, showErrorMessage);

  const handleConfirm = useCallback(async () => {
    if (!pickupTime) {
      return;
    }

    const formattedPickupTime = getTimeFromDateObject(pickupTime);

    await checkinChild({ childId, pickupTime: formattedPickupTime });

    closeModal();
  }, [childId, pickupTime, closeModal]);

  if (!childId) {
    return null;
  }

  return (
    <Modal id={Modals.CHECKIN_CHILD}>
      <DialogTitle>Checkin child</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker<Date>
            minTime={new Date()}
            value={pickupTime}
            onChange={setPickupTime}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={handleConfirm} variant="contained">Check in</Button>
      </DialogActions>
    </Modal>
  );
};

export default CheckinChildModal;
