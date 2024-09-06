import { ColumnType } from '@/components/table/table.types';
import { mutate } from 'swr';
import { deleteRiskFactor } from './risk-factor.service';
import React from 'react';
import { RiskFactor } from '@prisma/client';
import EditRiskFactorButton from './edit-risk-factor-button';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@heroicons/react/24/outline';

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
    className: 'capitalize text-center align-middle ',
    renderCell: (row: RiskFactor) => row.name.toLowerCase(),
  },
  {
    headerName: 'Valor',
    field: 'value',
    className: 'capitalize text-center align-middle ',
  },
  {
    headerName: 'Accion',
    field: '',
    className: 'capitalize text-center align-middle ',
    renderCell: (row: RiskFactor) => {
      return (
        <React.Fragment>
          <EditRiskFactorButton riskFactor={row} key={row.id.toString()} />
          <Button
            className="bg-transparent hover:bg-transparent"
            onClick={() => deleteRiskFactorWrapper(row.id.toString())}
          >
            <TrashIcon className='w-6 h-6 dark:text-gray-400 dark:hover:text-white' />
          </Button>
        </React.Fragment>
      );
    },
  },
];
