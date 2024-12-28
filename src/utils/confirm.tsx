import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { renderToRoot } from './render-to-root';

interface ConfirmProps {
  title: string;
  message: string;
  onConfirm(): void;
  onCancel(): void;
  onDestroy(): void;
}

function Confirm({
  title,
  message,
  onConfirm,
  onCancel,
  onDestroy,
}: ConfirmProps) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);

    setTimeout(() => {
      onDestroy();
    }, 1000);
  };

  const handleCancel = () => {
    handleClose();
    onCancel();
  };

  const handleConfirm = () => {
    handleClose();
    onConfirm();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>取消</Button>
        <Button onClick={handleConfirm} autoFocus color="primary">
          确认
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function confirm(title: string, message: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    renderToRoot((destroy) => (
      <Confirm
        title={title}
        message={message}
        onDestroy={destroy}
        onConfirm={() => resolve(true)}
        onCancel={() => resolve(false)}
      />
    ));
  });
}
