import Modal from '@/components/common/modal';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';
import React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TreatmentTypeAttribute } from '@prisma/client';
import TreatmentTypeAttributeForm from '@/components/forms/treatment-type-attribute-form';

interface Props {
  entity: TreatmentTypeAttribute;
}

export default function EditTreatmentTypeAttributeButton({ entity }: Props) {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
        className="bg-transparent hover:bg-transparent"
        onClick={() =>
          openModal(
            <TreatmentTypeAttributeForm
              entity={entity}
              treatmentTypeId={entity.treatmentTypeId.toString()}
              closeModal={closeModal}
              customMutate={`/api/treatment-types/${entity.treatmentTypeId}/attributes`}
            />,
          )
        }
      >
        <PencilSquareIcon className="w-6 h-6 dark:text-gray-400 dark:hover:text-white" />
      </Button>
      <Modal title="Editar Atributo" open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
