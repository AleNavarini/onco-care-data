import { ColumnType } from '@/components/table/table.types';
import { TreatmentTypeAttribute } from '@prisma/client';
import EditTreatmentTypeAttributeButton from './edit-treatment-type-attribute-button';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { mutate } from 'swr';

const deleteTreatmentTypeAttribute = async (
  treatmentTypeAttribute: TreatmentTypeAttribute,
) => {
  let result = confirm('Seguro que quiere borrar el atributo?');
  if (!result) return;
  const response = await fetch(
    `/api/v1/treatment-types-attributes/${treatmentTypeAttribute.id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (response.ok)
    mutate(
      `/api/v1/treatment-types/${treatmentTypeAttribute.treatmentTypeId}/attributes`,
    );
};

export const columns: ColumnType[] = [
  {
    headerName: 'Nombre',
    field: 'name',
    width: 200,
  },
  {
    headerName: 'Valor',
    field: 'value',
    width: 200,
  },
  {
    headerName: 'Accion',
    field: '',
    className: 'capitalize text-center align-middle ',
    renderCell: (row: TreatmentTypeAttribute) => {
      return (
        <>
          <EditTreatmentTypeAttributeButton
            entity={row}
            key={row.id.toString()}
          />
          <Button
            className="bg-transparent hover:bg-transparent"
            onClick={() => deleteTreatmentTypeAttribute(row)}
          >
            <TrashIcon className="w-6 h-6 dark:text-gray-400 dark:hover:text-white" />
          </Button>
        </>
      );
    },
  },
];
