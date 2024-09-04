import Modal from '@/components/common/modal';
import StudyTypeAttributeForm from '@/components/forms/study-type-attribute-form';
import TreatmentTypeAttributeForm from '@/components/forms/treatment-type-attribute-form';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';
import React from 'react';

interface Props {
  treatmentTypeId?: string;
}
export default function AddTreatmentTypeAttributeButton({
  treatmentTypeId,
}: Props) {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
        onClick={() =>
          openModal(
            <TreatmentTypeAttributeForm
              closeModal={closeModal}
              treatmentTypeId={treatmentTypeId}
              customMutate={`/api/treatment-types/${treatmentTypeId}/attributes`}
            />,
          )
        }
      >
        Crear Atributo
      </Button>
      <Modal title="Crear Atributo" open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
