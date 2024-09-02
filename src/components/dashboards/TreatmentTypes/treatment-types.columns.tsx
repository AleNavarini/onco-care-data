import { ColumnType } from '@/components/table/table.types';
import { IconButton, Link } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import { mutate } from 'swr';
import { deleteTreatmentType } from './treatment-type.service';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import EditTreatmentTypeButton from './EditTreatmentTypeButton';
import React from 'react';
import { TreatmentType } from '@prisma/client';

const deleteTreatmentTypeWrapper = async (treatmentTypeId: string) => {
  let result = confirm('Seguro que quiere borrar el tipo de tratamiento?');
  if (!result) return;
  const response = await deleteTreatmentType(treatmentTypeId);
  if (response.status === 200) mutate('/api/treatment-types');
};

export const columns: ColumnType[] = [
  {
    headerName: 'Nombre',
    field: 'name',
    width: 150,
    style: {
      textAlign: 'center',
      textTransform: 'capitalize',
      verticalAlign: 'middle',
    },
    renderCell: (row: TreatmentType) => row.name.toLowerCase(),
  },
  {
    headerName: 'Accion',
    field: '',
    width: 90,
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (row: TreatmentType) => {
      return (
        <React.Fragment>
          <EditTreatmentTypeButton treatmentType={row} />
          <IconButton
            color="neutral"
            variant="plain"
            onClick={() => deleteTreatmentTypeWrapper(row.id.toString())}
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
    width: 100,
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (row: TreatmentType) => {
      return (
        <Link href={`treatmentType/${row.id}`}>
          <IconButton color="neutral" variant="plain">
            <ArrowCircleRightOutlinedIcon />
          </IconButton>
        </Link>
      );
    },
  },
];
