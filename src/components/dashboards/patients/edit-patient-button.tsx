import Modal from '@/components/common/modal';
import PatientForm from '@/components/forms/patient-form';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';
import { FullPatient } from '@/types/full-patient';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { mutate } from 'swr';

interface EditPatientButtonProps {
  patient: FullPatient;
}

export default function EditPatientButton({ patient }: EditPatientButtonProps) {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button className="bg-transparent hover:bg-transparent"
        onClick={() =>
          openModal(
            <PatientForm setModalOpen={closeModal} oldPatient={patient} />,
          )
        }
      >
        <EditIcon />
      </Button>

      <Modal title="Editar Paciente" open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment >
  );
}
