import Modal from '@/components/common/modal';
import useModal from '@/hooks/use-modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from '@mui/joy';
import React from 'react';

interface AddButtonProps {
  text: string;
  form: React.ReactNode;
}

export default function AddButton({ form, text }: AddButtonProps) {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<AddBoxIcon />}
        onClick={() => openModal(form)}
      >
        {text}
      </Button>
      <Modal title={text} open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
