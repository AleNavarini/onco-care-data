import { ColumnType } from '@/components/table/table.types';
import { mutate } from 'swr';
import { deleteDisease } from './disease.service';
import EditDiseaseButton from './edit-disease-button';
import React from 'react';
import { Disease } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRightCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

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
            className="bg-transparent hover:bg-transparent shadow-none"
            onClick={() => deleteDiseaseWrapper(row.id.toString())}
          >
            <TrashIcon className="w-6 h-6 text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
          </Button>
          <Link href={`disease/${row.id}`}>
            <Button className="bg-transparent hover:bg-transparent shadow-none">
              <ArrowRightCircleIcon className="w-6 h-6 text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
            </Button>
          </Link>
        </React.Fragment>
      );
    },
  },
];
