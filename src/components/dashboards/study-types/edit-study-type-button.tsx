import Modal from '@/components/common/modal';
import StudyTypeForm from '@/components/forms/study-type-form';
import useModal from '@/hooks/use-modal';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/joy';
import { StudyType } from '@prisma/client';
import React from 'react';

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
            <StudyTypeForm closeModal={closeModal} oldStudyType={studyType} />,
          )
        }
      >
        <EditIcon />
      </IconButton>
      <Modal title="Editar Estudio" open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
