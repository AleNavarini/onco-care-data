import { ColumnType } from '@/components/table/table.types';
import DeleteIcon from '@mui/icons-material/Delete';
import { mutate } from 'swr';
import { deleteTreatmentType } from './treatment-type.service';

import EditTreatmentTypeButton from './edit-treatment-type-button';
import React from 'react';
import { TreatmentType } from '@prisma/client';
import Link from 'next/link';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

const deleteTreatmentTypeWrapper = async (treatmentTypeId: string) => {
  let result = confirm('Seguro que quiere borrar el tipo de tratamiento?');
  if (!result) return;
  const response = await deleteTreatmentType(treatmentTypeId);
  if (response.ok) mutate('/api/v1/treatment-types');
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
          <Button
            className='bg-transparent hover:bg-transparent'
            onClick={() => deleteTreatmentTypeWrapper(row.id.toString())}
          >
            <DeleteIcon />
          </Button>
          <Link href={`treatmentType/${row.id}`}>
            <Button
              className='bg-transparent hover:bg-transparent'
            >
              <ArrowRightCircleIcon />
            </Button>
          </Link>
        </React.Fragment>
      );
    },
  },
];
