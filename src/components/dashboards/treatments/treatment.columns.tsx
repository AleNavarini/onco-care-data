import { ColumnType } from '@/components/table/table.types';
import React from 'react';
import { Treatment, TreatmentType } from '@prisma/client';
import { columns as treatmentTypeAttributesColumns } from '../treatment-type-attributes/treatment-type-attributes.columns';
import { columns as treatmentTypeResultsColumns } from '../treatment-type-results/treatment-type-results.columns';
import TableBody from '@/components/table/table-body';
import EditButton from '@/components/common/edit-button';
import { IconButton, Sheet } from '@mui/joy';
import { deleteStudy } from './treatment.service';
import DeleteIcon from '@mui/icons-material/Delete';
import TreatmentForm from '@/components/treatments/treatment-form';

export const columns: ColumnType[] = [
  {
    headerName: 'Inicio',
    field: '',
    width: 80,
    renderCell: (row: Treatment) =>
      row.startDate ? new Date(row.startDate).toLocaleDateString() : '',
  },
  {
    headerName: 'Fin',
    field: '',
    width: 80,
    renderCell: (row: Treatment) =>
      row.endDate ? new Date(row.endDate).toLocaleDateString() : '',
  },
  {
    headerName: 'Tipo',
    field: 'treatmentType.name',
    renderCell: (row: Treatment & { treatmentType: TreatmentType }) => (
      <p>{row.treatmentType.name}</p>
    ),
  },
  {
    headerName: 'Atributos',
    field: '',
    width: 300,
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
    width: 300,
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
              <TreatmentForm
                oldTreatment={row}
                patientId={row.patientId!.toString()}
                treatmentTypeId={row.treatmentTypeId!.toString()}
              />
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
