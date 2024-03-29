import { ColumnType } from '@/components/Table/table.types';
import React from 'react';
import { Study } from '@prisma/client';
import { columns as studyTypeAttributesColumns } from '../StudyTypeAttributes/study-type-attributes.columns';
import TableBody from '@/components/Table/TableBody';
import EditButton from '@/components/Common/EditButton';
import StudyForm from '@/components/Forms/StudyForm';
import { IconButton, Sheet } from '@mui/joy';
import { deleteStudy } from './study.service';
import DeleteIcon from '@mui/icons-material/Delete';

export const columns: ColumnType[] = [
  {
    headerName: 'Fecha',
    field: 'date',
    width: 80,
    renderCell: (row: Study) => new Date(row.date).toLocaleDateString(),
  },
  {
    headerName: 'Estudio',
    field: 'studyType.name',
    width: 80,
    renderCell: (row: any) => row.studyType.name,
  },

  {
    headerName: 'Atributos / Valores',
    field: '',
    width: 100,
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (row: any) => (
      <Sheet
        sx={{
          backgroundColor: 'transparent',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <TableBody
          columns={studyTypeAttributesColumns}
          rows={row.studyTypeAttributes}
        />
      </Sheet>
    ),
  },
  {
    headerName: 'Accion',
    field: '',
    width: 40,
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (row: Study) => {
      return (
        <React.Fragment>
          <EditButton
            form={
              <StudyForm oldStudy={row} patientId={row.patientId!.toString()} />
            }
          />
          <IconButton
            color="neutral"
            variant="plain"
            onClick={() =>
              deleteStudy(row.id.toString(), row.patientId!.toString())
            }
          >
            <DeleteIcon />
          </IconButton>
        </React.Fragment>
      );
    },
  },
];
