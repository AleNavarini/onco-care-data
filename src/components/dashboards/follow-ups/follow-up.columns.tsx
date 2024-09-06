import { ColumnType } from '@/components/table/table.types';
import React from 'react';
import { FollowUp } from '@prisma/client';
import EditButton from '@/components/common/edit-button';
import FollowUpForm from '@/components/forms/follow-up-form';
import { deleteFollowUp } from './follow-up.service';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

const renderBoolean = (value: boolean | null) => {
  if (value === null) return '';
  return value ? 'Si' : 'No';
};
export const columns: ColumnType[] = [
  {
    headerName: 'Fecha',
    field: 'date',
    width: 80,
    renderCell: (row: FollowUp) =>
      new Date(row.date).toISOString().split('T')[0],
  },
  {
    headerName: 'Vino',
    field: 'attended',
    width: 60,
    renderCell: (row: FollowUp) => renderBoolean(row.attended),
  },
  {
    headerName: 'Tiene Enfermedad',
    field: 'hasDisease',
    width: 105,
    renderCell: (row: FollowUp) => renderBoolean(row.hasDisease),
  },
  {
    headerName: 'Sitio Recidiva',
    field: 'recurrenceSite',
    width: 100,
  },
  {
    headerName: 'Murio',
    field: 'died',
    width: 70,
    renderCell: (row: FollowUp) => renderBoolean(row.died),
  },
  {
    headerName: 'Causa Muerte',
    field: 'causeOfDeath',
    width: 70,
  },
  {
    headerName: 'Observaciones',
    field: 'observations',
    width: 125,
  },
  {
    headerName: 'Accion',
    field: '',
    width: 90,
    renderCell: (row: FollowUp) => {
      return (
        <React.Fragment>
          <EditButton
            form={
              <FollowUpForm
                oldFollowUp={row}
                patientId={row.patientId!.toString()}
              />
            }
          />
          <Button
            className="bg-transparent hover:bg-transparent"
            onClick={() => deleteFollowUp(row)}
          >
            <TrashIcon className="w-6 h-6 dark:text-gray-400 dark:hover:text-white" />
          </Button>
        </React.Fragment>
      );
    },
  },
];
