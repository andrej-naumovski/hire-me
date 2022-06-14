import {
  Button,
  Pagination,
  Table, TableBody, TableCell, TableHead, TableRow, useEventCallback
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { Child } from '../../api/types';
import { Modals } from '../../context/modal';
import useModalState from '../../hooks/useModalState';
import usePaginatedData from '../../hooks/usePaginatedData';
import { convertIsoToBirthday, getDateTimeFromIsoDate } from '../../utils/date';
import CheckinChildModal from '../CheckinChildModal';
import CheckoutChildModal from '../CheckoutChildModal';
import GlobalError from '../GlobalError';
import useChildrenList from './hooks/useChildrenList';

const ChildrenList = () => {
  const [alertText, setAlertText] = useState<string | null>(null);
  const { data } = useChildrenList();

  const { openModal: openCheckinModal } = useModalState(Modals.CHECKIN_CHILD);
  const { openModal: openCheckoutModal } = useModalState(Modals.CHECKOUT_CHILD);

  const {
    data: children, pageCount, page, setPage
  } = usePaginatedData(data, 20);

  const closeAlert = () => {
    setAlertText(null);
  };

  const onPageChange = useEventCallback((_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  });

  const childAction = (child: Child) => () => {
    if (child.checkedIn) {
      openCheckoutModal({ childId: child.childId });
    } else {
      openCheckinModal({ childId: child.childId });
    }
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Full name</TableCell>
            <TableCell variant="head">Birthday</TableCell>
            <TableCell variant="head">Checked in?</TableCell>
            <TableCell variant="head">Check in time</TableCell>
            <TableCell variant="head">Pickup time</TableCell>
            <TableCell variant="head">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {children.map((child) => (
            <TableRow key={child.childId}>
              <TableCell>{child.name.fullName}</TableCell>
              <TableCell>{convertIsoToBirthday(child.birthday)}</TableCell>
              <TableCell>{child.checkedIn ? 'Yes' : 'No'}</TableCell>
              <TableCell>{getDateTimeFromIsoDate(child.checkinTime) ?? 'N/A'}</TableCell>
              <TableCell>{getDateTimeFromIsoDate(child.pickupTime) ?? 'N/A'}</TableCell>
              <TableCell><Button onClick={childAction(child)} variant="contained">{child.checkedIn ? 'Check out' : 'Check in'}</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Pagination count={pageCount} page={page} onChange={onPageChange} color="primary" />
      </Table>
      {alertText && <GlobalError message={alertText} onClose={closeAlert} />}
      <CheckoutChildModal showErrorMessage={setAlertText} />
      <CheckinChildModal showErrorMessage={setAlertText} />
    </>
  );
};

export default ChildrenList;
