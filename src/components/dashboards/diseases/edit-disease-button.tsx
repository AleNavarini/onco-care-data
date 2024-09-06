import Modal from '@/components/common/modal';
import DiseaseForm from '@/components/forms/disease-form';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
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
      <Button
        className="bg-transparent hover:bg-transparent"
        onClick={() =>
          openModal(
            <DiseaseForm closeModal={closeModal} oldDisease={disease} />,
          )
        }
      >
        <PencilSquareIcon className='w-6 h-6 dark:text-gray-400 dark:hover:text-white' />
      </Button>
      <Modal title="Editar Enfermedad" open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
