import Modal from '@/components/common/modal';
import useModal from '@/hooks/use-modal';
import React from 'react';
import { Button } from '../ui/button';

interface AddButtonProps {
  text: string;
  form: React.ReactElement;
  disabled?: boolean;
}

export default function AddButton({ form, text, disabled }: AddButtonProps) {
  const { open, openModal, closeModal } = useModal();

  const clonedForm = React.cloneElement(form, {
    closeModal: closeModal,
  });

  return (
    <React.Fragment>
      <Button disabled={disabled} onClick={() => openModal(form)}>
        {text}
      </Button>
      <Modal title={text} open={open} handleClose={closeModal}>
        {clonedForm}
      </Modal>
    </React.Fragment>
  );
}
