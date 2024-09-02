import React from 'react';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectLabel
} from '@/components/ui/select';

export interface FilterCriteria {
  text: string;
  status: string;
  disease: string;
}

interface PatientsFilterProps {
  filterCriteria: FilterCriteria;
  onFilterChange: (newCriteria: FilterCriteria) => void;
}

interface Disease {
  id: string;
  name: string;
}

interface DiseasesResponse {
  status: number;
  diseases: Disease[];
}

export default function PatientsFilter({
  filterCriteria,
  onFilterChange,
}: PatientsFilterProps): JSX.Element {
  const { data, error } = useSWR<DiseasesResponse>('/api/diseases', fetcher);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onFilterChange({ ...filterCriteria, text: e.target.value });
  };

  const handleStatusChange = (value: string): void => {
    onFilterChange({ ...filterCriteria, status: value });
  };

  const handleDiseaseChange = (value: string): void => {
    onFilterChange({ ...filterCriteria, disease: value });
  };

  const diseases = data?.diseases || [];

  if (error) return <div>Failed to load diseases</div>;

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Input
        type="text"
        placeholder="Buscar"
        value={filterCriteria.text}
        onChange={handleTextChange}
      />
      <Select
        onValueChange={handleDiseaseChange}
      >
        <SelectTrigger >
          <SelectValue placeholder="Elija una enfermedad" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Enfermedades</SelectLabel>
            <SelectItem value="all">Todos</SelectItem>
            {diseases.map((disease: Disease) => (
              <SelectItem key={disease.id.toString()} value={disease.id}>
                {disease.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={handleStatusChange}
      >
        <SelectTrigger >
          <SelectValue placeholder="Elija un estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Enfermedades</SelectLabel>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Activo</SelectItem>
            <SelectItem value="following">En Seguimiento</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

    </div>
  );
}
