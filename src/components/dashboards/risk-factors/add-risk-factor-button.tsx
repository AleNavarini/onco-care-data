import Modal from '@/components/common/modal';
import DiseaseForm from '@/components/forms/disease-form';
import RiskFactorForm from '@/components/forms/risk-factor-form';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';
import React from 'react';
import { mutate } from 'swr';

export default function AddRiskFactorButton() {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
        onClick={() => openModal(<RiskFactorForm closeModal={closeModal} />)}
      >
        Crear Factor de Riesgo
      </Button>
      <Modal title="Crear Enfermedad" open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
