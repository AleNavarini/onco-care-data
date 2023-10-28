import React, { useEffect, useState } from 'react';
import { Input, Select, Sheet, Option } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import { Patient } from '@prisma/client';

interface PatientsFilterProps {
  patients: Patient[];
  onFilter: (filteredPatients: Patient[]) => void;
}

export default function PatientsFilter({
  patients,
  onFilter,
}: PatientsFilterProps) {
  const [textFilter, setTextFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    let filtered = [...patients];

    if (textFilter) {
      filtered = filtered.filter((patient: Patient) =>
        JSON.stringify(patient)
          .toLowerCase()
          .includes(textFilter.toLowerCase()),
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (patient: Patient) => patient.status === statusFilter,
      );
    }

    onFilter(filtered);
  }, [textFilter, statusFilter, patients, onFilter]);

  return (
    <Sheet sx={{ display: 'flex', gap: 1 }}>
      <Input
        type="text"
        placeholder="Buscar"
        value={textFilter}
        startDecorator={<SearchIcon />}
        onChange={(e: any) => setTextFilter(e.target.value)}
      />
      <Select
        size="sm"
        placeholder="Filtrar por estado"
        onChange={(_, value) => setStatusFilter(value!)}
        value={statusFilter}
      >
        <Option value="">Todos</Option>
        <Option value="active">Activa</Option>
        <Option value="following">En Seguimiento</Option>
      </Select>
    </Sheet>
  );
}
