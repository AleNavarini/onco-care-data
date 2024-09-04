import { ColumnType } from '@/components/table/table.types';
import { IconButton, Link } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import { mutate } from 'swr';
import { deleteStudyType } from './study-type.service';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import EditStudyTypeButton from './edit-study-type-button';
import React from 'react';
import { StudyType } from '@prisma/client';

const deleteStudyTypesWrapper = async (diseaseId: string) => {
  let result = confirm('Seguro que quiere borrar el estudio?');
  if (!result) return;
  const response = await deleteStudyType(diseaseId);
  if (response.status === 200) mutate('/api/study-types');
};

export const columns: ColumnType[] = [
  {
    headerName: 'Nombre',
    field: 'name',
    className: 'capitalize text-center align-middle ',
    renderCell: (row: StudyType) => row.name.toLowerCase(),
  },
  {
    headerName: 'Accion',
    field: '',
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (row: StudyType) => {
      return (
        <React.Fragment>
          <EditStudyTypeButton studyType={row} />
          <IconButton
            color="neutral"
            variant="plain"
            onClick={() => deleteStudyTypesWrapper(row.id.toString())}
          >
            <DeleteIcon />
          </IconButton>
          <Link href={`studyType/${row.id}`}>
            <IconButton color="neutral" variant="plain">
              <ArrowCircleRightOutlinedIcon />
            </IconButton>
          </Link>
        </React.Fragment>
      );
    },
  },
];
