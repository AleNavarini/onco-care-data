import { ColumnType } from '@/components/table/table.types';
import { IconButton } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { Staging } from '@prisma/client';
import { deleteStaging } from './staging.service';
import StagingForm from '@/components/forms/staging-form';
import EditButton from '@/components/common/edit-button';
import { TrashIcon } from '@heroicons/react/24/outline';

export const columns: ColumnType[] = [
  {
    headerName: 'Fecha',
    field: 'date',
    width: 80,
    renderCell: (row: Staging) => new Date(row.date).toLocaleDateString(),
  },
  {
    headerName: 'FIGO',
    field: 'figo',
    width: 80,
  },
  {
    headerName: 'Tipo',
    field: 'type',
    width: 80,
  },

  {
    headerName: 'Accion',
    field: '',
    width: 90,
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (row: Staging) => {
      return (
        <React.Fragment>
          <EditButton
            form={
              <StagingForm
                oldStaging={row}
                patientId={row.patientId!.toString()}
              />
            }
          />
          <IconButton
            color="neutral"
            variant="plain"
            onClick={() => deleteStaging(row)}
          >
            <TrashIcon className="w-6 h-6 dark:text-gray-400 dark:hover:text-white" />
          </IconButton>
        </React.Fragment>
      );
    },
  },
];
