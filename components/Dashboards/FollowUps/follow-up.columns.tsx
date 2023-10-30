import { ColumnType } from '@/components/Table/table.types';
import { IconButton, Link } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import React from 'react';
import { Disease, FollowUp } from '@prisma/client';
import EditButton from '@/components/Common/EditButton';
import FollowUpForm from '@/components/Forms/FollowUpForm';
import { deleteFollowUp } from './follow-up.service';

export const columns: ColumnType[] = [
  {
    headerName: 'Fecha',
    field: 'date',
    width: 100,
    renderCell: (row: FollowUp) => new Date(row.date).toLocaleDateString(),
  },
  {
    headerName: 'Vino',
    field: 'attended',
    width: 100,
    renderCell: (row: FollowUp) => (row.attended ? 'SI' : 'NO'),
  },
  {
    headerName: 'Tiene Enfermedad',
    field: 'hasDisease',
    width: 100,
    renderCell: (row: FollowUp) => (row.hasDisease ? 'SI' : 'NO'),
  },
  {
    headerName: 'Sitio Recidiva',
    field: 'recurrenceSite',
    width: 100,
  },
  {
    headerName: 'Murio',
    field: 'died',
    width: 100,
    renderCell: (row: FollowUp) => (row.died ? 'SI' : 'NO'),
  },
  {
    headerName: 'Causa Muerte',
    field: 'causeOfDeath',
    width: 100,
  },
  {
    headerName: 'Observaciones',
    field: 'observations',
    width: 100,
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
