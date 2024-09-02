import Modal from '@/components/common/modal';
import StudyTypeForm from '@/components/forms/StudyTypeForm';
import useModal from '@/hooks/useModal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from '@mui/joy';
import React from 'react';
import { mutate } from 'swr';

export default function AddStudyTypeButton() {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<AddBoxIcon />}
        onClick={() =>
          openModal(
            <StudyTypeForm
              handler={() => mutate('/api/study-types')}
              setModalOpen={closeModal}
            />,
          )
        }
      >
        Crear Estudio
      </Button>
      <Modal open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
