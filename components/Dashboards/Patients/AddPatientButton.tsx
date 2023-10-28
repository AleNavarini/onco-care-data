import Modal from '@/components/Common/Modal';
import PatientForm from '@/components/Forms/PatientForm';
import useModal from '@/hooks/useModal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from "@mui/joy";
import React from 'react';
import { mutate } from 'swr';

export default function AddPatientButton() {
    const { open, openModal, closeModal, modalContent } = useModal();
    return (
        <React.Fragment>
            <Button
                variant="outlined"
                color="neutral"
                startDecorator={<AddBoxIcon />}
                onClick={() =>
                    openModal(
                        <PatientForm
                            handler={() => mutate('/api/patients')}
                            setModalOpen={closeModal}
                        />,
                    )
                }
            >
                Create patient
            </Button>
            <Modal open={open} handleClose={closeModal}>
                {modalContent}
            </Modal>
        </React.Fragment>
    )
}