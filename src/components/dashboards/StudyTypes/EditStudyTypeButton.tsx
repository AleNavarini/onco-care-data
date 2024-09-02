import Modal from '@/components/common/modal';
import StudyTypeForm from '@/components/forms/StudyTypeForm';
import useModal from '@/hooks/useModal';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/joy';
import { StudyType } from '@prisma/client';
import React from 'react';
import { mutate } from 'swr';

interface EditDiseaseButtonProps {
  studyType: StudyType;
}

export default function EditStudyTypeButton({
  studyType,
}: EditDiseaseButtonProps) {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <IconButton
        onClick={() =>
          openModal(
            <StudyTypeForm
              handler={() => mutate('/api/study-types')}
              setModalOpen={closeModal}
              oldStudyType={studyType}
            />,
          )
        }
      >
        <EditIcon />
      </IconButton>
      <Modal open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
