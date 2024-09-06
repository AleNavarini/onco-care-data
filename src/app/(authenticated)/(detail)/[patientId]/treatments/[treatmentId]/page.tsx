'use client';
import AddButton from '@/components/common/add-button';
import EditButton from '@/components/common/edit-button';
import ComplicationForm from '@/components/forms/complication-form';
import Datagrid from '@/components/table/datagrid';
import { Button } from '@/components/ui/button';
import fetcher from '@/utils/fetcher';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Complication } from '@prisma/client';
import useSWR, { mutate } from 'swr';

const deleteComplication = async (complication: Complication) => {
  const response = await fetch(
    `/api/v2/treatments/${complication.treatmentId}/complications/${complication.id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (response.ok)
    mutate(`/api/v2/treatments/${complication.treatmentId}/complications`);
};
const columns = [
  {
    headerName: 'Hora',
    field: 'time',
    width: 80,
  },
  {
    headerName: 'Tipo',
    field: 'type',
    width: 80,
  },
  {
    headerName: 'Transfusiones',
    field: 'transfusions',
    width: 80,
  },
  {
    headerName: 'Accion',
    field: '',
    width: 80,
    renderCell: (row: Complication) => {
      return (
        <div className="flex gap-2 justify-center items-center">
          <EditButton
            form={
              <ComplicationForm
                oldComplication={row}
                treatmentId={row.treatmentId.toString()}
              />
            }
          />
          <Button
            className="bg-transparent hover:bg-transparent shadow-none"
            onClick={() => deleteComplication(row)}
          >
            <TrashIcon className="w-6 h-6 text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
          </Button>
        </div>
      );
    },
  },
];
export default function TreatmentPage({ params }: any) {
  const { treatmentId } = params;
  const { data } = useSWR(
    `/api/v2/treatments/${treatmentId}/complications`,
    fetcher,
    {
      suspense: true,
    },
  );

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full p-8">
      <div className="flex gap-2 w-full justify-between items-center">
        <p>Complicaciones</p>
        <AddButton
          text="Crear Complicación"
          form={<ComplicationForm treatmentId={treatmentId} />}
        />
      </div>
      <Datagrid rows={data.data} columns={columns} />
    </div>
  );
}
