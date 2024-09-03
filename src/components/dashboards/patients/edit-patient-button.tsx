import Modal from '@/components/common/modal';
import PatientForm from '@/components/forms/patient-form';
import useModal from '@/hooks/use-modal';
import { FullPatient } from '@/types/full-patient';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/joy';
import React from 'react';
import { mutate } from 'swr';

interface EditPatientButtonProps {
  patient: FullPatient;
}

export default function EditPatientButton({ patient }: EditPatientButtonProps) {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <IconButton
        color="neutral"
        variant="plain"
        onClick={() =>
          openModal(
            <PatientForm
              handler={() => mutate('/api/patients')}
              setModalOpen={closeModal}
              oldPatient={patient}
            />,
          )
        }
      >
        <EditIcon />
      </IconButton>

      <Modal title='Editar Paciente' open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
