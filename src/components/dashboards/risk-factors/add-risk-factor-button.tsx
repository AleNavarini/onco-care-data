import Modal from '@/components/common/modal';
import RiskFactorForm from '@/components/forms/risk-factor-form';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';
import React from 'react';

interface Props {
  patientId?: string;
  diseaseId?: string;
}

export default function AddRiskFactorButton({ patientId, diseaseId }: Props) {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
        onClick={() =>
          openModal(
            <RiskFactorForm
              diseaseId={diseaseId}
              patientId={patientId}
              closeModal={closeModal}
              customMutate={`/api/v1/diseases/${diseaseId}/risk-factors`}
            />,
          )
        }
      >
        Crear Factor de Riesgo
      </Button>
      <Modal
        title="Crear Factor de Riesgo"
        open={open}
        handleClose={closeModal}
      >
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
