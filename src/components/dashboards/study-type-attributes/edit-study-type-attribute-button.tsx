import Modal from '@/components/common/modal';
import RiskFactorForm from '@/components/forms/risk-factor-form';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';
import React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { StudyTypeAttribute } from '@prisma/client';
import StudyTypeAttributeForm from '@/components/forms/study-type-attribute-form';

interface Props {
  studyTypeAttribute: StudyTypeAttribute;
}

export default function EditStudyTypeAttributeButton({
  studyTypeAttribute,
}: Props) {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
        className="bg-transparent hover:bg-transparent shadow-none"
        onClick={() =>
          openModal(
            <StudyTypeAttributeForm
              entity={studyTypeAttribute}
              studyTypeId={studyTypeAttribute.studyTypeId.toString()}
              closeModal={closeModal}
              customMutate={`/api/v1/study-types/${studyTypeAttribute.studyTypeId}/attributes`}
            />,
          )
        }
      >
        <PencilSquareIcon className="w-6 h-6 text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
      </Button>
      <Modal title="Editar Atributo" open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
