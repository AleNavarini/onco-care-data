import { ColumnType } from '@/components/Table/table.types';
import React from 'react';
import { Study, Treatment } from '@prisma/client';
import Datagrid from '@/components/Table/Datagrid';
import { columns as treatmentTypeAttributesColumns } from '../TreatmentTypes/treatment-type-attributes.columns'
import { columns as treatmentTypeResultsColumns } from '../TreatmentTypes/treatment-type-results.columns'
import TableHead from '@/components/Table/TableHead';
import TableBody from '@/components/Table/TableBody';
import EditButton from '@/components/Common/EditButton';
import StudyForm from '@/components/Forms/StudyForm';
import { IconButton, Sheet } from '@mui/joy';
import { deleteStudy } from './treatment.service';
import DeleteIcon from '@mui/icons-material/Delete';
import TreatmentForm from '@/components/Forms/TreatmentForm';

export const columns: ColumnType[] = [
  {
    headerName: 'Inicio',
    field: '',
    width: 80,
    renderCell: (row: Treatment) => row.startDate ? new Date(row.startDate).toLocaleDateString() : "",
  },
  {
    headerName: 'Fin',
    field: '',
    width: 80,
    renderCell: (row: Treatment) => row.endDate ? new Date(row.endDate).toLocaleDateString() : "",
  },
  {
    headerName: 'Atributos',
    field: '',
    width: 200,
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (row: any) => (
      <Sheet
        sx={{
          backgroundColor: 'transparent',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <TableBody
          columns={treatmentTypeAttributesColumns}
          rows={row.treatmentTypeAttributes}
        />
      </Sheet>
    ),
  },
  {
    headerName: 'Resultados',
    field: '',
    width: 200,
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
          columns={treatmentTypeResultsColumns}
          rows={row.treatmentTypeResults}
        />
      </Sheet>
    ),
  },
  {
    headerName: 'Complicaciones',
    field: '',
    width: 200,
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
          columns={treatmentTypeResultsColumns}
          rows={row.complications}
        />
      </Sheet>
    ),
  },
  {
    headerName: 'Accion',
    field: '',
    width: 80,
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (row: Treatment) => {
      return (
        <React.Fragment>
          <EditButton
            form={
              <TreatmentForm oldTreatment={row} patientId={row.patientId!.toString()} />
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
