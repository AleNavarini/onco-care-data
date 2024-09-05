import { ColumnType } from '@/components/table/table.types';
import React from 'react';
import EditStudyTypeAttributeButton from './edit-study-type-attribute-button';
import { Button } from '@/components/ui/button';
import { StudyTypeAttribute } from '@prisma/client';
import { TrashIcon } from '@heroicons/react/24/outline';
import { mutate } from 'swr';

const deleteStudyTypeAttribute = async (
  studyTypeAttribute: StudyTypeAttribute,
) => {
  let result = confirm('Seguro que quiere borrar el atributo?');
  if (!result) return;
  const response = await fetch(
    `/api/v1/study-types-attributes/${studyTypeAttribute.id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (response.ok)
    mutate(`/api/v1/study-types/${studyTypeAttribute.studyTypeId}/attributes`);
};

export const columns: ColumnType[] = [
  {
    headerName: 'Nombre',
    field: 'name',
    width: 200,
  },
  {
    headerName: 'Accion',
    field: '',
    className: 'capitalize text-center align-middle ',
    renderCell: (row: StudyTypeAttribute) => {
      return (
        <React.Fragment>
          <EditStudyTypeAttributeButton
            studyTypeAttribute={row}
            key={row.id.toString()}
          />
          <Button
            className="bg-transparent hover:bg-transparent"
            onClick={() => deleteStudyTypeAttribute(row)}
          >
            <TrashIcon className="w-6 h-6 dark:text-gray-400 dark:hover:text-white" />
          </Button>
        </React.Fragment>
      );
    },
  },
];
