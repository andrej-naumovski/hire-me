import {
  Pagination,
  Table, TableBody, TableCell, TableHead, TableRow, useEventCallback
} from '@mui/material';
import { ChangeEvent } from 'react';
import usePaginatedData from '../../hooks/usePaginatedData';
import useChildrenList from './hooks/useChildrenList';

const ChildList = () => {
  const { data } = useChildrenList();

  const {
    data: children, pageCount, page, setPage
  } = usePaginatedData(data, 20);

  const onPageChange = useEventCallback((_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell variant="head">Full name</TableCell>
          <TableCell variant="head">Birthday</TableCell>
          <TableCell variant="head">Checked in?</TableCell>
          <TableCell variant="head">Check in time</TableCell>
          <TableCell variant="head">Pickup time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {children.map((child) => (
          <TableRow key={child.childId}>
            <TableCell>{child.name.fullName}</TableCell>
            <TableCell>{child.birthday}</TableCell>
            <TableCell>{child.checkedIn ? 'Yes' : 'No'}</TableCell>
            <TableCell>{child.checkinTime ?? 'N/A'}</TableCell>
            <TableCell>{child.pickupTime ?? 'N/A'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <Pagination count={pageCount} page={page} onChange={onPageChange} color="primary" />
    </Table>
  );
};

export default ChildList;
