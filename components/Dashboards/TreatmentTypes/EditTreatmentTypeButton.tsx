import Modal from '@/components/Common/Modal';
import TreatmentTypeForm from '@/components/Forms/TreatmentTypeForm';
import useModal from '@/hooks/useModal';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/joy';
import { TreatmentType } from '@prisma/client';
import React from 'react';
import { mutate } from 'swr';

interface EditDiseaseButtonProps {
  treatmentType: TreatmentType;
}

export default function EditTreatmentTypeButton({
  treatmentType,
}: EditDiseaseButtonProps) {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <IconButton
        onClick={() =>
          openModal(
            <TreatmentTypeForm
              handler={() => mutate('/api/treatment-types')}
              setModalOpen={closeModal}
              oldTreatmentType={treatmentType}
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
