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
import { Suspense, useState } from 'react';
import useSWR from 'swr';
import TreatmentsDashboard from '@/components/dashboards/treatments/treatments-dashboard';
import CenteredLoading from '@/components/ui/centered-loading';

interface TreatmentsPageProps {
  params: {
    patientId: string;
  };
}

export default function TreatmentsPage({ params }: TreatmentsPageProps) {
  const { patientId } = params;
  const [treatmentType, setTreatmentType] = useState<TreatmentType | null>(
    null,
  );

  const { data } = useSWR(`/api/v2/treatment-types`, fetcher);


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
          <Suspense fallback={<CenteredLoading />}>
            <Select onValueChange={handleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Elija un tipo de tratamiento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estudios</SelectLabel>
                  {data?.data.map((treatment: TreatmentType) => (
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
          </Suspense>
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
      <Suspense fallback={<CenteredLoading />}>
        <TreatmentsDashboard patientId={patientId} />
      </Suspense>
    </div>
  );
}
