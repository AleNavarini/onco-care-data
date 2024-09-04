import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, IconButton, Modal, Typography, Sheet } from '@mui/joy';
import { PreviousSurgery } from '@prisma/client';
import { useState } from 'react';
import PreviousSurgeryForm from './previous-surgery-form';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import { columns } from './previous-surgeries.columns';
import AddButton from '../common/add-button';
import Datagrid from '../table/datagrid';

interface Props {
  patientId: string;
}

export default function PreviousSurgeriesTable({ patientId }: Props) {
  const { data } = useSWR(
    `/api/v2/patients/${patientId}/previous-surgeries`,
    fetcher,
    {
      suspense: true,
    },
  );
  console.log(data);

  const previousSurgeries = data.data;
  return (
    <div className="flex flex-col gap-4 items-end">
      <div className="flex justify-between w-full items-center">
        <p>Cirugias previas</p>
        <AddButton
          text="Crear Cirugia Previa"
          form={
            <PreviousSurgeryForm
              patientId={patientId}
              customMutate={`/api/v2/patients/${patientId}/previous-surgeries`}
            />
          }
        />
      </div>
      <Datagrid rows={previousSurgeries} columns={columns} />
    </div>
  );
}
