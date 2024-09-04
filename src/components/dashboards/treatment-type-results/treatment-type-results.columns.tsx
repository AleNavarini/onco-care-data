import { ColumnType } from '@/components/table/table.types';
import { TreatmentTypeResult } from '@prisma/client';
import { mutate } from 'swr';
import EditTreatmentTypeResultButton from './edit-treatment-type-result-button';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@heroicons/react/24/outline';

const deleteTreatmentTypeResult = async (
  treatmentTypeResult: TreatmentTypeResult,
) => {
  let result = confirm('Seguro que quiere borrar el resultado?');
  if (!result) return;
  const response = await fetch(
    `/api/v1/treatment-types-results/${treatmentTypeResult.id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (response.ok)
    mutate(
      `/api/v1/treatment-types/${treatmentTypeResult.treatmentTypeId}/results`,
    );
};

export const columns: ColumnType[] = [
  {
    headerName: 'Nombre',
    field: 'name',
  },
  {
    headerName: 'Valor',
    field: 'value',
  },
  {
    headerName: 'Accion',
    field: '',
    className: 'capitalize text-center align-middle ',
    renderCell: (row: TreatmentTypeResult) => {
      return (
        <>
          <EditTreatmentTypeResultButton
            treamentTypeResult={row}
            key={row.id.toString()}
          />
          <Button
            className="bg-transparent hover:bg-transparent"
            onClick={() => deleteTreatmentTypeResult(row)}
          >
            <TrashIcon className="w-6 h-6 dark:text-gray-400 dark:hover:text-white" />
          </Button>
        </>
      );
    },
  },
];
