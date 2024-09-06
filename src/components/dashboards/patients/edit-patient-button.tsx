import Modal from '@/components/common/modal';
import PatientForm from '@/components/forms/patient-form';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';
import { FullPatient } from '@/types/full-patient';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface EditPatientButtonProps {
  patient: FullPatient;
}

export default function EditPatientButton({ patient }: EditPatientButtonProps) {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
        className="bg-transparent hover:bg-transparent shadow-none"
        onClick={() =>
          openModal(
            <PatientForm setModalOpen={closeModal} oldPatient={patient} />,
          )
        }
      >
        <PencilSquareIcon className="w-6 h-6 text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
      </Button>

      <Modal title="Editar Paciente" open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
