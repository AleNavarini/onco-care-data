import { ColumnType } from '@/components/table/table.types';
import { mutate } from 'swr';
import { deleteRiskFactor } from './risk-factor.service';
import React from 'react';
import { RiskFactor } from '@prisma/client';
import EditButton from '@/components/common/edit-button';
import RiskFactorForm from '@/components/forms/risk-factor-form';
import EditRiskFactorButton from './edit-risk-factor-button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

const deleteRiskFactorWrapper = async (id: string) => {
  let result = confirm('Seguro que quiere borrar la enfermedad?');
  if (!result) return;
  const response = await deleteRiskFactor(id);
  if (response.status === 200) mutate('/api/v1/patient-risk-factors');
};

const updateHandler = async (riskFactor: RiskFactor) => {
  mutate(`/api/v1/patient-risk-factors/${riskFactor.patientId}`);
};

export const columns: ColumnType[] = [
  {
    headerName: 'Nombre',
    field: 'name',
    width: 150,
    className: 'capitalize text-center align-middle ',
    renderCell: (row: RiskFactor) => row.name.toLowerCase(),
  },
  {
    headerName: 'Accion',
    field: '',
    width: 90,
    className: 'capitalize text-center align-middle ',
    renderCell: (row: RiskFactor) => {
      return (
        <React.Fragment>
          <EditRiskFactorButton riskFactor={row} />
          <Button
            className="bg-transparent hover:bg-transparent shadow-none"
            onClick={() => deleteRiskFactorWrapper(row.id.toString())}
          >
            <TrashIcon className="w-6 h-6 text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
          </Button>
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
    style: { textAlign: 'center', verticalAlign: 'middle' },
  };
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
              form={
                <RiskFactorForm
                  oldRiskFactor={row}
                  patientId={row.patientId?.toString()}
                />
              }
            />
            <Button
              className="bg-transparent hover:bg-transparent shadow-none"
              onClick={() => deleteRiskFactorWrapper(row.id.toString())}
            >
              <TrashIcon className="w-6 h-6 text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
            </Button>
          </React.Fragment>
        );
      },
    },
  ];
};
