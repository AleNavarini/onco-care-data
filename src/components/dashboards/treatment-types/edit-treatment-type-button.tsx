import Modal from '@/components/common/modal';
import TreatmentTypeForm from '@/components/forms/treatment-type-form';
import useModal from '@/hooks/use-modal';
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
              closeModal={closeModal}
              oldTreatmentType={treatmentType}
            />,
          )
        }
      >
        <EditIcon />
      </IconButton>
      <Modal
        title="Editar Tipo de Tratamiento"
        open={open}
        handleClose={closeModal}
      >
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
