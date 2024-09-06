'use client';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import AddButton from '@/components/common/add-button';
import TreatmentForm from '@/components/treatments/treatment-form';
import fetcher from '@/utils/fetcher';
import { TreatmentType } from '@prisma/client';
import { useState } from 'react';
import useSWR from 'swr';
import TreatmentsDashboard from '@/components/dashboards/treatments/treatments-dashboard';

interface TreatmentsPageProps {
  params: {
    patientId: string;
  };
}

export default function TreatmentsPage({ params }: TreatmentsPageProps) {
  const { patientId } = params;
  const { data } = useSWR(`/api/v2/treatment-types`, fetcher, {
    suspense: true,
  });

  const [treatmentType, setTreatmentType] = useState<TreatmentType | null>(
    null,
  );

  function handleChange(value: string) {
    setTreatmentType(
      data.data.find(
        (treatmentType: TreatmentType) => treatmentType.id.toString() === value,
      ),
    );
  }

  return (
    <div className="flex flex-col gap-4 items-end w-full p-8">
      <div className="flex justify-between w-full items-end">
        <p>Tratamientos</p>

        <div className="flex gap-2">
          <Select onValueChange={handleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Elija un tipo de tratamiento" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Estudios</SelectLabel>
                {data.data.map((treatment: TreatmentType) => (
                  <SelectItem
                    key={treatment.id.toString()}
                    value={treatment.id.toString()}
                  >
                    {treatment.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <AddButton
            text={`Crear ${treatmentType ? treatmentType.name : 'Estudio'}`}
            form={
              <TreatmentForm
                patientId={patientId}
                treatmentTypeId={treatmentType?.id.toString()}
              />
            }
            disabled={treatmentType === null}
          />
        </div>
      </div>
      <TreatmentsDashboard patientId={patientId} />
    </div>
  );
}
