'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Spinner from '@/components/ui/spinner';
import { fetchData } from '@/utils/fetch-data';
import fetcher from '@/utils/fetcher';
import { Disease, Patient } from '@prisma/client';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';

interface Props {
  patient: Patient & { disease?: Disease };
}
export default function DiseaseSelect({ patient }: Props) {
  const [loading, setLoading] = useState(false);
  const { data } = useSWR('/api/diseases', fetcher, {
    suspense: true,
  });

  const handleChange = async (value: string) => {
    const proceed: boolean = window.confirm(
      'Deseas cambiar la enfermedad? Esto va a borrar los factores de riesgos cargados si ya los hay',
    );
    if (!proceed) return;
    setLoading(true);
    const submitData: any = { name: value, patientId: patient.id };

    if (patient.diseaseId) submitData.deleteRiskFactors = true;
    const endpoint = 'patient-disease';
    const method = patient.diseaseId ? 'PUT' : 'POST';
    const result = await fetchData(endpoint, method, submitData);
    if (result) await mutate(`/api/patients/${patient.id}?detailed=true`);
    setLoading(false);
  };

  return (
    <div className="w-max relative">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 bg-black">
          <Spinner className="dark:text-white text-gray-400 w-4 h-4" />
        </div>
      )}
      <Select onValueChange={handleChange} defaultValue={patient.disease?.name}>
        <SelectTrigger>
          <SelectValue placeholder="Elija una enfermedad" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Enfermedades</SelectLabel>
            <SelectItem value="all">Todos</SelectItem>
            {data.diseases.map((disease: any) => (
              <SelectItem key={disease.id.toString()} value={disease.name}>
                {disease.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
