import { Modal as JoyModal, ModalDialog } from '@mui/joy';
import React from 'react';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}
export default function Modal({ open, handleClose, children }: ModalProps) {
  return (
    <JoyModal
      open={open}
      onClose={handleClose}
      sx={{
        backdropFilter: 'blur(0)',
        zIndex: 100,
      }}
    >
      <ModalDialog
        sx={{
          overflow: 'auto',
          flexGrow: 1,
          minWidth: '300px',
        }}
      >
        {children}
      </ModalDialog>
    </JoyModal>
  );
}
