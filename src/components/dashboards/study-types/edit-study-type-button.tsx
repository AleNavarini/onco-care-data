import Modal from '@/components/common/modal';
import StudyTypeForm from '@/components/forms/study-type-form';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
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
      <Button
        className='bg-transparent hover:bg-transparent'
        onClick={() =>
          openModal(
            <StudyTypeForm closeModal={closeModal} oldStudyType={studyType} />,
          )
        }
      >
        <PencilSquareIcon className='w-6 h-6 dark:text-gray-400 dark:hover:text-white' />
      </Button>
      <Modal title="Editar Estudio" open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
