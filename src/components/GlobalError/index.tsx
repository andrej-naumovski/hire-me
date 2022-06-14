import { Alert, styled } from '@mui/material';
import { createPortal } from 'react-dom';

const root = document.getElementById('alert-root');

const GlobalAlert = styled(Alert)`
    position: absolute;
    top: 0;
    width: 100%;
`;

interface AlertProps {
    onClose: () => void;
    message: string;
}

const GlobalError = ({ onClose, message }: AlertProps) =>
  (!root ? null : createPortal(<GlobalAlert onClose={onClose} variant="filled" color="error">{message}</GlobalAlert>, root));

export default GlobalError;
