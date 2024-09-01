import React from 'react';
import {
  Input,
  Select,
  Sheet,
  Option,
  MenuItem,
  FormControl,
  FormLabel,
} from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

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

  const handleStatusChange = (
    _: React.SyntheticEvent | null,
    value: string | null,
  ): void => {
    onFilterChange({ ...filterCriteria, status: value || '' });
  };

  const handleDiseaseChange = (
    _: React.SyntheticEvent | null,
    value: string | null,
  ): void => {
    onFilterChange({ ...filterCriteria, disease: value || '' });
  };

  const diseases = data?.diseases || [];

  if (error) return <div>Failed to load diseases</div>;

  return (
    <Sheet
      sx={{
        display: 'flex',
        gap: 1,
        flexDirection: {
          xs: 'column',
          sm: 'column',
          md: 'row',
        },
      }}
    >
      <FormControl>
        <FormLabel>Buscar</FormLabel>
        <Input
          type="text"
          placeholder="Buscar"
          value={filterCriteria.text}
          startDecorator={<SearchIcon />}
          onChange={handleTextChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Estado</FormLabel>
        <Select onChange={handleStatusChange} value={filterCriteria.status}>
          <Option value="">Todos</Option>
          <Option value="active">Activa</Option>
          <Option value="following">En Seguimiento</Option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Enfermedad</FormLabel>
        <Select onChange={handleDiseaseChange} value={filterCriteria.disease}>
          <Option value="">Todas</Option>
          {diseases.map((disease: Disease) => (
            <Option key={disease.id} value={disease.id}>
              {disease.name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Sheet>
  );
}
