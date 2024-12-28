import { useState } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { renderToRoot } from './render-to-root';

interface ToastProps {
  severity: AlertColor;
  message: string;
  onDestroy(): void;
}

function Toast({ severity, message, onDestroy }: ToastProps) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);

    setTimeout(() => {
      onDestroy();
    }, 1000);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export function showToast(severity: AlertColor, message: string) {
  renderToRoot((destroy) => (
    <Toast severity={severity} message={message} onDestroy={destroy} />
  ));
}
