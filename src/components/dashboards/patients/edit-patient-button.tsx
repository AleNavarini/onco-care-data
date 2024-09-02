import Modal from '@/components/common/modal';
import PatientForm from '@/components/forms/PatientForm';
import useModal from '@/hooks/useModal';
import { FullPatient } from '@/types/FullPatient';
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

      <Modal open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
