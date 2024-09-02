import { ColumnType } from '@/components/table/table.types';
import { IconButton, Link } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import { mutate } from 'swr';
import { deleteDisease } from './disease.service';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import EditDiseaseButton from './EditDiseaseButton';
import React from 'react';
import { Disease } from '@prisma/client';

const deleteDiseaseWrapper = async (diseaseId: string) => {
  let result = confirm('Seguro que quiere borrar la enfermedad?');
  if (!result) return;
  const response = await deleteDisease(diseaseId);
  if (response.status === 200) mutate('/api/diseases');
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
    renderCell: (row: Disease) => row.name.toLowerCase(),
  },
  {
    headerName: 'Accion',
    field: '',
    width: 90,
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (row: Disease) => {
      return (
        <React.Fragment>
          <EditDiseaseButton disease={row} />
          <IconButton
            color="neutral"
            variant="plain"
            onClick={() => deleteDiseaseWrapper(row.id.toString())}
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
    renderCell: (row: Disease) => {
      return (
        <Link href={`disease/${row.id}`}>
          <IconButton color="neutral" variant="plain">
            <ArrowCircleRightOutlinedIcon />
          </IconButton>
        </Link>
      );
    },
  },
];
