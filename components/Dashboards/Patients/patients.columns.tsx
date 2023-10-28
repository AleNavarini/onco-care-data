import StatusChip from '@/components/StatusChip';
import { ColumnType } from '@/components/Table/table.types';
import { IconButton, Link } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import { mutate } from 'swr';
import { FullPatient } from '@/types/FullPatient';
import { deletePatient } from './patient.service';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import EditPatientButton from './EditPatientButton';
import React from 'react';
import { capitalize } from '@mui/material';
import { Patient } from '@prisma/client';

const deletePatientWrapper = async (patientId: string) => {
  let result = confirm('Seguro que quiere borrar el paciente?');
  if (!result) return;
  const response = await deletePatient(patientId);
  if (response.status === 200) mutate('/api/patients');
};

export const columns: ColumnType[] = [
  {
    headerName: 'Nombre',
    field: 'name',
    style: { textAlign: 'center', textTransform: 'capitalize' },
    renderCell: (row: FullPatient) => row.name.toLowerCase(),
  },
  {
    headerName: 'Telefono',
    field: 'phone',
    style: { textAlign: 'center' },
  },
  {
    headerName: 'Mail',
    field: 'email',
    style: { textAlign: 'center' },
  },
  {
    headerName: 'Estado',
    field: 'status',
    style: { textAlign: 'center' },
    renderCell: (row: any) => <StatusChip status={row.status} />,
  },
  {
    headerName: 'Accion',
    field: '',
    style: { textAlign: 'center' },
    renderCell: (row: FullPatient) => {
      return (
        <React.Fragment>
          <EditPatientButton patient={row} />
          <IconButton
            color="neutral"
            variant="plain"
            onClick={() => deletePatientWrapper(row.id.toString())}
          >
            <DeleteIcon />
          </IconButton>
        </React.Fragment>
      );
    },
  },
  {
    headerName: '',
    field: '',
    width: 60,
    renderCell: (row: FullPatient) => {
      return (
        <Link href={`/${row.id}`}>
          <IconButton color="neutral" variant="plain">
            <ArrowCircleRightOutlinedIcon />
          </IconButton>
        </Link>
      );
    },
  },
];
