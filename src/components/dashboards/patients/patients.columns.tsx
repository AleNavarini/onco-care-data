import StatusChip from '@/components/status-chip';
import { ColumnType } from '@/components/table/table.types';
import { mutate } from 'swr';
import { FullPatient } from '@/types/full-patient';
import { deletePatient } from './patient.service';
import EditPatientButton from './edit-patient-button';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from 'lucide-react';

const deletePatientWrapper = async (patientId: string) => {
  let result = confirm('Seguro que quiere borrar el paciente?');
  if (!result) return;
  const response = await deletePatient(patientId);
  if (response.status === 200) mutate('/api/v1/patients');
};

export const columns: ColumnType[] = [
  {
    headerName: 'Nombre',
    field: 'name',
    width: 150,
    className: 'capitalize text-center',
    renderCell: (row: FullPatient) => row.name.toLowerCase(),
  },
  {
    headerName: 'Telefono',
    field: 'phone',
    width: 150,
  },
  {
    headerName: 'Mail',
    field: 'email',
    width: 300,
  },
  {
    headerName: 'Estado',
    field: 'status',
    width: 150,

    renderCell: (row: any) => <StatusChip status={row.status} />,
  },
  {
    headerName: 'Enfermedad',
    field: 'disease.name',
    width: 150,

    renderCell: (row: any) => row.disease?.name,
  },
  {
    headerName: 'Accion',
    field: '',
    width: 90,

    renderCell: (row: FullPatient) => {
      return (
        <React.Fragment>
          <EditPatientButton patient={row} />
          <Button
            className="bg-transparent hover:bg-transparent shadow-none"
            onClick={() => deletePatientWrapper(row.id.toString())}
          >
            <TrashIcon className="w-6 h-6 text-gray-400 hover:text-gray-700 text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
          </Button>
          <Link href={`/${row.id}/dashboards`}>
            <Button className="bg-transparent hover:bg-transparent shadow-none">
              <ArrowRightCircleIcon className="w-6 h-6 text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
            </Button>
          </Link>
        </React.Fragment>
      );
    },
  },
  // {
  //   headerName: '',
  //   field: '',
  //   width: 60,
  //   renderCell: (row: FullPatient) => {
  //     return (

  //     );
  //   },
  // },
];
