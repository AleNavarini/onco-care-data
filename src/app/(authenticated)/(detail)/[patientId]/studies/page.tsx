'use client';

import AddButton from '@/components/common/add-button';
import StudiesDashboard from '@/components/dashboards/studies/studies-dashboard';
import StudyForm from '@/components/forms/study-form';
import fetcher from '@/utils/fetcher';
import { StudyType } from '@prisma/client';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { Suspense, useState } from 'react';
import useSWR from 'swr';
import CenteredLoading from '@/components/ui/centered-loading';

interface StudiesPageProps {
  params: {
    patientId: string;
  };
}

export default function Studies({ params }: StudiesPageProps) {
  const { patientId } = params;
  const [studyType, setStudyType] = useState<StudyType | null>(null);

  const { data } = useSWR(`/api/v1/study-types`, fetcher);

  function handleChange(value: string) {
    setStudyType(
      data?.studyTypes.find(
        (studyType: StudyType) => studyType.id.toString() === value,
      ),
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full p-8">
      <div className="flex justify-between w-full items-end">
        <p>Estudios</p>

        <div className="flex gap-2">
          <Suspense fallback={<CenteredLoading />}>
            <Select onValueChange={handleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Elija un tipo de estudio" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estudios</SelectLabel>
                  {data?.studyTypes.map((studyType: StudyType) => (
                    <SelectItem
                      key={studyType.id.toString()}
                      value={studyType.id.toString()}
                    >
                      {studyType.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Suspense>
          <AddButton
            text={`Crear ${studyType ? studyType.name : 'Estudio'}`}
            form={<StudyForm patientId={patientId} studyType={studyType} />}
            disabled={studyType === null}
          />
        </div>
      </div>
      <Suspense fallback={<CenteredLoading />}>
        <StudiesDashboard patientId={patientId} />
      </Suspense>
    </div>
  );
}
