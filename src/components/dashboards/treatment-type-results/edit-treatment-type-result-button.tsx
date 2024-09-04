import Modal from '@/components/common/modal';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TreatmentTypeResult } from '@prisma/client';
import TreatmentTypeResultForm from '@/components/forms/treatment-type-result-form';

interface Props {
  treamentTypeResult: TreatmentTypeResult;
}

export default function EditTreatmentTypeResultButton({
  treamentTypeResult,
}: Props) {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <>
      <Button
        className="bg-transparent hover:bg-transparent"
        onClick={() =>
          openModal(
            <TreatmentTypeResultForm
              entity={treamentTypeResult}
              closeModal={closeModal}
              customMutate={`/api/v1/treatment-types/${treamentTypeResult.treatmentTypeId}/results`}
            />,
          )
        }
      >
        <PencilSquareIcon className="w-6 h-6 dark:text-gray-400 dark:hover:text-white" />
      </Button>
      <Modal title="Editar Atributo" open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
}
