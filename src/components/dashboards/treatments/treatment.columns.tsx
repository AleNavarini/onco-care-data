import { ColumnType } from '@/components/table/table.types';
import React from 'react';
import {
  Complication,
  Treatment,
  TreatmentType,
  TreatmentTypeAttribute,
  TreatmentTypeResult,
} from '@prisma/client';
import EditButton from '@/components/common/edit-button';
import { deleteStudy } from './treatment.service';
import TreatmentForm from '@/components/treatments/treatment-form';
import { Button } from '@/components/ui/button';
import { ArrowRightCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

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
      <div className="flex flex-col gap-2 w-full justify-center items-center">
        {row.treatmentTypeAttributes.map(
          (attribute: TreatmentTypeAttribute) => (
            <p key={attribute.id.toString()}>
              {attribute.name} - {attribute.value}
            </p>
          ),
        )}
      </div>
    ),
  },
  {
    headerName: 'Resultados',
    field: '',
    width: 300,
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (row: any) => (
      <div className="flex flex-col gap-2 w-full justify-center items-center">
        {row.treatmentTypeResults.map((result: TreatmentTypeResult) => (
          <p key={result.id.toString()}>
            {result.name} - {result.value}
          </p>
        ))}
      </div>
    ),
  },
  {
    headerName: 'Complicaciones',
    field: '',
    width: 200,
    style: { textAlign: 'center', verticalAlign: 'middle' },
    renderCell: (row: any) => (
      <div className="flex flex-col gap-2 w-full justify-center items-center">
        {row.treatmentTypeResults.map((complication: Complication) => (
          <p key={complication.id.toString()}>
            {complication.time} - {complication.type}-{' '}
            {complication.transfusions}
          </p>
        ))}
      </div>
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
          <Button
            className="bg-transparent hover:bg-transparent"
            onClick={() =>
              deleteStudy(row.id.toString(), row.patientId!.toString())
            }
          >
            <TrashIcon className="w-6 h-6 dark:text-gray-400 dark:hover:text-white" />
          </Button>
          <Button className="bg-transparent hover:bg-transparent">
            <Link href={`treatments/${row.id}`}>
              <ArrowRightCircleIcon className="w-6 h-6 dark:text-gray-400 dark:hover:text-white" />
            </Link>
          </Button>
        </React.Fragment>
      );
    },
  },
];
