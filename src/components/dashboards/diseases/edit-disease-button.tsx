import Modal from '@/components/common/modal';
import DiseaseForm from '@/components/forms/disease-form';
import useModal from '@/hooks/use-modal';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/joy';
import { Disease } from '@prisma/client';
import React from 'react';
import { mutate } from 'swr';

interface EditDiseaseButtonProps {
  disease: Disease;
}

export default function EditDiseaseButton({ disease }: EditDiseaseButtonProps) {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <IconButton
        onClick={() =>
          openModal(
            <DiseaseForm
              handler={() => mutate('/api/diseases')}
              setModalOpen={closeModal}
              oldDisease={disease}
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
