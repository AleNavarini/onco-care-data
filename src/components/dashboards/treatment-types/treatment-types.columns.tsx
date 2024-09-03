import { ColumnType } from '@/components/table/table.types';
import { IconButton, Link } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import { mutate } from 'swr';
import { deleteTreatmentType } from './treatment-type.service';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import EditTreatmentTypeButton from './edit-treatment-type-button';
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
    className: 'capitalize text-center align-middle ',
    renderCell: (row: TreatmentType) => row.name.toLowerCase(),
  },
  {
    headerName: 'Accion',
    field: '',
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
          <Link href={`treatmentType/${row.id}`}>
            <IconButton color="neutral" variant="plain">
              <ArrowCircleRightOutlinedIcon />
            </IconButton>
          </Link>
        </React.Fragment>
      );
    },
  },
];
