import Modal from '@/components/common/modal';
import TreatmentTypeResultForm from '@/components/forms/treatment-type-result-form';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';

interface Props {
  treatmentTypeId?: string;
}
export default function AddTreatmentTypeResultButton({ treatmentTypeId }: Props) {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <>
      <Button
        onClick={() =>
          openModal(
            <TreatmentTypeResultForm
              closeModal={closeModal}
              treatmentTypeId={treatmentTypeId}
              customMutate={`/api/treatment-types/${treatmentTypeId}/results`}
            />,
          )
        }
      >
        Crear Resultado
      </Button>
      <Modal title="Crear Resultado" open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
}
