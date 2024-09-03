import Modal from '@/components/common/modal';
import useModal from '@/hooks/use-modal';
import { IconButton } from '@mui/joy';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

interface EditButtonProps {
  form: React.ReactElement;
}

export default function EditButton({ form }: EditButtonProps) {
  const { open, openModal, closeModal, modalContent } = useModal();

  const formWithProps = React.cloneElement(form, { closeModal });

  return (
    <React.Fragment>
      <IconButton
        variant="plain"
        color="neutral"
        onClick={() => openModal(formWithProps)}
      >
        <EditIcon />
      </IconButton>
      <Modal title="Editar" open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
