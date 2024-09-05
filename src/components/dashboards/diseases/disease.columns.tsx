import { ColumnType } from '@/components/table/table.types';
import DeleteIcon from '@mui/icons-material/Delete';
import { mutate } from 'swr';
import { deleteDisease } from './disease.service';
import EditDiseaseButton from './edit-disease-button';
import React from 'react';
import { Disease } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';

const deleteDiseaseWrapper = async (diseaseId: string) => {
  let result = confirm('Seguro que quiere borrar la enfermedad?');
  if (!result) return;
  const response = await deleteDisease(diseaseId);
  if (response.status === 200) mutate('/api/v1/diseases');
};

export const columns: ColumnType[] = [
  {
    headerName: 'Nombre',
    field: 'name',
    className: 'capitalize text-center align-middle',
    renderCell: (row: Disease) => row.name.toLowerCase(),
  },
  {
    headerName: 'Accion',
    field: '',
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (row: Disease) => {
      return (
        <React.Fragment>
          <EditDiseaseButton disease={row} />
          <Button
            className="bg-transparent hover:bg-transparent"
            onClick={() => deleteDiseaseWrapper(row.id.toString())}
          >
            <DeleteIcon />
          </Button>
          <Link href={`disease/${row.id}`}>
            <Button className="bg-transparent hover:bg-transparent">
              <ArrowRightCircleIcon />
            </Button>
          </Link>
        </React.Fragment>
      );
    },
  },
];
