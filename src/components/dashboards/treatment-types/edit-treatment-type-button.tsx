import Modal from '@/components/common/modal';
import TreatmentTypeForm from '@/components/forms/treatment-type-form';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';
import { TreatmentType } from '@prisma/client';
import { Pencil } from 'lucide-react';
import React from 'react';

interface EditDiseaseButtonProps {
  treatmentType: TreatmentType;
}

export default function EditTreatmentTypeButton({
  treatmentType,
}: EditDiseaseButtonProps) {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
        className="bg-transparent hover:bg-transparent shadow-none"
        onClick={() =>
          openModal(
            <TreatmentTypeForm
              closeModal={closeModal}
              oldTreatmentType={treatmentType}
            />,
          )
        }
      >
        <Pencil className="w-6 h-6 text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
      </Button>
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
