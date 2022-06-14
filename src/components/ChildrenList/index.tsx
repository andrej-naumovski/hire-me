import {
  Button,
  Pagination,
  Table, TableBody, TableCell, TableHead, TableRow, useEventCallback
} from '@mui/material';
import { ChangeEvent } from 'react';
import usePaginatedData from '../../hooks/usePaginatedData';
import { convertIsoToBirthday, getDateTimeFromIsoDate } from '../../utils/date';
import GlobalError from '../GlobalError';
import useChildrenList from './hooks/useChildrenList';

const ChildrenList = () => {
  const { data } = useChildrenList();

  const {
    data: children, pageCount, page, setPage
  } = usePaginatedData(data, 20);

  const onPageChange = useEventCallback((_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  });

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
              <TableCell><Button variant="contained">{child.checkedIn ? 'Check out' : 'Check in'}</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Pagination count={pageCount} page={page} onChange={onPageChange} color="primary" />
      </Table>
      <GlobalError message="Testing global error" onClose={() => console.log} />
    </>
  );
};

export default ChildrenList;
