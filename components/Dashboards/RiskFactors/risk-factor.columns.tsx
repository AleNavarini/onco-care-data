import { ColumnType } from '@/components/Table/table.types';
import { IconButton } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import { mutate } from 'swr';
import { deleteRiskFactor } from './risk-factor.service';
import React from 'react';
import { RiskFactor } from '@prisma/client';
import EditButton from '@/components/Common/EditButton';
import RiskFactorForm from '@/components/Forms/RiskFactorForm';

const deleteRiskFactorWrapper = async (id: string) => {
  let result = confirm('Seguro que quiere borrar la enfermedad?');
  if (!result) return;
  const response = await deleteRiskFactor(id);
  if (response.status === 200) mutate('/api/patient-risk-factors');
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
    renderCell: (row: RiskFactor) => row.name.toLowerCase(),
  },
  {
    headerName: 'Accion',
    field: '',
    width: 90,
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (row: RiskFactor) => {
      return (
        <React.Fragment>
          <EditButton
            form={<RiskFactorForm oldRiskFactor={row} />}
          />
          <IconButton
            color="neutral"
            variant="plain"
            onClick={() => deleteRiskFactorWrapper(row.id.toString())}
          >
            <DeleteIcon />
          </IconButton>
        </React.Fragment>
      );
    },
  },
];

export const getColumns = (withPatient: boolean): ColumnType[] => {
  const valueColumn: ColumnType = {
    headerName: 'Valor',
    field: 'value',
    width: 150,
    style: { textAlign: 'center', verticalAlign: 'middle' }
  }
  return [
    {
      headerName: 'Nombre',
      field: 'name',
      width: 150,
      style: {
        textAlign: 'center',
        textTransform: 'capitalize',
        verticalAlign: 'middle',
      },
      renderCell: (row: RiskFactor) => row.name.toLowerCase(),
    },
    ...(withPatient ? [valueColumn] : []),
    {
      headerName: 'Accion',
      field: '',
      width: 90,
      style: { textAlign: 'center', verticalAlign: 'middle' },
      renderCell: (row: RiskFactor) => {
        return (
          <React.Fragment>
            <EditButton
              form={<RiskFactorForm oldRiskFactor={row} />}
            />
            <IconButton
              color="neutral"
              variant="plain"
              onClick={() => deleteRiskFactorWrapper(row.id.toString())}
            >
              <DeleteIcon />
            </IconButton>
          </React.Fragment>
        );
      },
    },
  ];
}
