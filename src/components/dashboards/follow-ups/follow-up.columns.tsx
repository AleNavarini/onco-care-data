import { ColumnType } from '@/components/table/table.types';
import { IconButton } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { FollowUp } from '@prisma/client';
import EditButton from '@/components/common/edit-button';
import FollowUpForm from '@/components/forms/FollowUpForm';
import { deleteFollowUp } from './follow-up.service';

export const columns: ColumnType[] = [
  {
    headerName: 'Fecha',
    field: 'date',
    width: 80,
    renderCell: (row: FollowUp) => new Date(row.date).toLocaleDateString(),
  },
  {
    headerName: 'Vino',
    field: 'attended',
    width: 60,
    renderCell: (row: FollowUp) => (row.attended ? 'SI' : 'NO'),
  },
  {
    headerName: 'Tiene Enfermedad',
    field: 'hasDisease',
    width: 105,
    renderCell: (row: FollowUp) => (row.hasDisease ? 'SI' : 'NO'),
    style: {
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      textAlign: 'center',
      verticalAlign: 'middle',
    },
  },
  {
    headerName: 'Sitio Recidiva',
    field: 'recurrenceSite',
    width: 100,
    style: {
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      textAlign: 'center',
      verticalAlign: 'middle',
    },
  },
  {
    headerName: 'Murio',
    field: 'died',
    width: 70,
    renderCell: (row: FollowUp) => (row.died ? 'SI' : 'NO'),
  },
  {
    headerName: 'Causa Muerte',
    field: 'causeOfDeath',
    width: 70,
    style: {
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      textAlign: 'center',
      verticalAlign: 'middle',
    },
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
    style: { textAlign: 'center', verticalAlign: 'middle' },
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
          <IconButton
            color="neutral"
            variant="plain"
            onClick={() => deleteFollowUp(row.id.toString())}
          >
            <DeleteIcon />
          </IconButton>
        </React.Fragment>
      );
    },
  },
];
