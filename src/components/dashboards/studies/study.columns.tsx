import { ColumnType } from '@/components/table/table.types';
import React from 'react';
import { Study, StudyType, StudyTypeAttribute } from '@prisma/client';
import EditButton from '@/components/common/edit-button';
import StudyForm from '@/components/forms/study-form';
import { deleteStudy } from './study.service';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';

export const columns: ColumnType[] = [
  {
    headerName: 'Fecha',
    field: 'date',
    renderCell: (row: Study) => new Date(row.date).toLocaleDateString(),
  },
  {
    headerName: 'Estudio',
    field: 'studyType.name',
    renderCell: (row: any) => row.studyType.name,
  },

  {
    headerName: 'Atributos - Valores',
    field: '',
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (row: any) => {
      return (
        <div className="flex flex-col gap-2 w-full justify-center items-center">
          {row.studyTypeAttributes.map((attribute: StudyTypeAttribute) => (
            <p key={attribute.id.toString()}>
              {attribute.name} - {attribute.value}
            </p>
          ))}
        </div>
      );
    },
  },
  {
    headerName: 'Accion',
    field: '',
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (
      row: Study & {
        studyType: StudyType;
        studyTypeAttributes: StudyTypeAttribute[];
      },
    ) => {
      const studyTypeWithAttributes = {
        ...row.studyType,
        attributes: row.studyTypeAttributes,
      };
      return (
        <React.Fragment>
          <EditButton
            form={
              <StudyForm
                oldStudy={row}
                patientId={row.patientId.toString()}
                studyType={studyTypeWithAttributes}
              />
            }
          />
          <Button
            className="bg-transparent hover:bg-transparent shadow-none"
            onClick={() =>
              deleteStudy(row.id.toString(), row.patientId!.toString())
            }
          >
            <TrashIcon className="w-6 h-6 text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
          </Button>
        </React.Fragment>
      );
    },
  },
];
