import Modal from '@/components/Common/Modal';
import RiskFactorForm from '@/components/Forms/RiskFactorForm';
import useModal from '@/hooks/useModal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from '@mui/joy';
import React from 'react';
import { mutate } from 'swr';

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
      <Modal open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
