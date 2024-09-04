import { Symptom } from '@prisma/client';
import { mutate } from 'swr';
import form from '../common/form';
import SymptomForm from '../forms/symptom-form';
import EditButton from '../common/edit-button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';

const deleteSymptom = async (symptom: Symptom) => {
  const response = await fetch(`/api/symptoms/${symptom.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) mutate(`/api/patients/symptoms/${symptom.patientId}`);
};

export const columns = [
  {
    headerName: 'Nombre',
    field: 'name',
    className: 'capitalize text-center align-middle ',
    renderCell: (row: Symptom) => row.name.toLowerCase(),
  },
  {
    headerName: 'Valor',
    field: 'value',
    className: 'capitalize text-center align-middle ',
  },
  {
    headerName: 'Accion',
    field: '',
    className: 'capitalize text-center align-middle ',
    renderCell: (row: Symptom) => {
      return (
        <>
          <EditButton
            form={
              <SymptomForm
                oldSymptom={row}
                patientId={row.patientId!.toString()}
                customMutate={`/api/patients/symptoms/${row.patientId}`}
              />
            }
          />
          <Button
            className="bg-transparent hover:bg-transparent"
            onClick={() => deleteSymptom(row)}
          >
            <TrashIcon className="w-6 h-6 dark:text-gray-400 dark:hover:text-white" />
          </Button>
        </>
      );
    },
  },
];
