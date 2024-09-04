import Modal from '@/components/common/modal';
import StudyTypeAttributeForm from '@/components/forms/study-type-attribute-form';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';
import React from 'react';

interface Props {
  studyTypeId?: string;
}
export default function AddStudyTypeAttributeButton({ studyTypeId }: Props) {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
        onClick={() =>
          openModal(
            <StudyTypeAttributeForm
              closeModal={closeModal}
              studyTypeId={studyTypeId}
              customMutate={`/api/v1/study-types/${studyTypeId}/attributes`}
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
