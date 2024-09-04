import Modal from '@/components/common/modal';
import useModal from '@/hooks/use-modal';
import { IconButton } from '@mui/joy';
import React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

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
        <PencilSquareIcon className="w-6 h-6 dark:text-gray-400 dark:hover:text-white" />
      </IconButton>
      <Modal title="Editar" open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
