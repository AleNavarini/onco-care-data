import { ColumnType } from '@/components/table/table.types';
import { mutate } from 'swr';
import { deleteStudyType } from './study-type.service';
import EditStudyTypeButton from './edit-study-type-button';
import React from 'react';
import { StudyType } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { ArrowRightCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const deleteStudyTypesWrapper = async (diseaseId: string) => {
  let result = confirm('Seguro que quiere borrar el estudio?');
  if (!result) return;
  const response = await deleteStudyType(diseaseId);
  if (response.status === 200) mutate('/api/v1/study-types');
};

export const columns: ColumnType[] = [
  {
    headerName: 'Nombre',
    field: 'name',
    className: 'capitalize text-center align-middle ',
    renderCell: (row: StudyType) => row.name.toLowerCase(),
  },
  {
    headerName: 'Accion',
    field: '',
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (row: StudyType) => {
      return (
        <React.Fragment>
          <EditStudyTypeButton studyType={row} />
          <Button
            className="bg-transparent hover:bg-transparent shadow-none"
            onClick={() => deleteStudyTypesWrapper(row.id.toString())}
          >
            <TrashIcon className="w-6 h-6 text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
          </Button>
          <Link href={`studyType/${row.id}`}>
            <Button className="bg-transparent hover:bg-transparent shadow-none">
              <ArrowRightCircleIcon />
            </Button>
          </Link>
        </React.Fragment>
      );
    },
  },
];
