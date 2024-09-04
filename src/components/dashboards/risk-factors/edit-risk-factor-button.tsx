import Modal from '@/components/common/modal';
import RiskFactorForm from '@/components/forms/risk-factor-form';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';
import React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { RiskFactor } from '@prisma/client';

interface Props {
  riskFactor: RiskFactor;
}

export default function EditRiskFactorButton({ riskFactor }: Props) {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
        className="bg-transparent hover:bg-transparent"
        onClick={() =>
          openModal(
            <RiskFactorForm
              oldRiskFactor={riskFactor}
              closeModal={closeModal}
              customMutate={
                riskFactor.patientId
                  ? `/api/v1/patient-risk-factors/${riskFactor.patientId}`
                  : `/api/v1/diseases/${riskFactor.diseaseId}/risk-factors`
              }
            />,
          )
        }
      >
        <PencilSquareIcon className="w-6 h-6 dark:text-gray-400 dark:hover:text-white" />
      </Button>
      <Modal
        title="Editar Factor de Riesgo"
        open={open}
        handleClose={closeModal}
      >
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
