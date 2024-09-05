import { PreviousSurgery } from '@prisma/client';
import EditButton from '../common/edit-button';
import PreviousSurgeryForm from './previous-surgery-form';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import { mutate } from 'swr';
import { ColumnType } from '../table/table.types';

const deletePreviousSurgery = async (previousSurgery: PreviousSurgery) => {
  const response = await fetch(
    `/api/v1/previous-surgeries/${previousSurgery.id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (response.ok)
    mutate(`/api/v2/patients/${previousSurgery.patientId}/previous-surgeries`);
};
export const columns: ColumnType[] = [
  {
    headerName: 'Tipo',
    field: 'surgeryType',
  },
  {
    headerName: 'Observaciones',
    field: 'observations',
  },
  {
    headerName: 'Accion',
    field: '',
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (row: PreviousSurgery) => {
      return (
        <>
          <EditButton
            form={
              <PreviousSurgeryForm
                oldEntity={row}
                patientId={row.patientId!.toString()}
                customMutate={`/api/v2/patients/${row.patientId}/previous-surgeries`}
              />
            }
          />
          <Button
            className="bg-transparent hover:bg-transparent"
            onClick={() => deletePreviousSurgery(row)}
          >
            <TrashIcon className="w-6 h-6 dark:text-gray-400 dark:hover:text-white" />
          </Button>
        </>
      );
    },
  },
];
