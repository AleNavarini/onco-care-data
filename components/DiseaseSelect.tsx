import { fetchData } from '@/utils/fetchData';
import { Select, Option, CircularProgress } from '@mui/joy';
import { Disease } from '@prisma/client';
import { useState } from 'react';
import { mutate } from 'swr';

interface Props {
  patient: any;
  diseases: Disease[];
  defaultValue?: string;
}

export default function DiseaseSelect({
  patient,
  diseases,
  defaultValue,
}: Props) {
  const [loading, setLoading] = useState(false);
  const handleChange = async (_e: null, value: string) => {
    const proceed: boolean = window.confirm(
      'Deseas cambiar la enfermedad? Esto va a borrar los factores de riesgos cargados si ya los hay',
    );
    if (!proceed) return;
    setLoading(true);
    const submitData: any = { name: value, patientId: patient.id };

    if (patient.disease) submitData.deleteRiskFactors = true;
    console.log(JSON.stringify(submitData, null, 2));
    const endpoint = 'patient-disease';
    const method = patient.disease ? 'PUT' : 'POST';
    const result = await fetchData(endpoint, method, submitData);
    if (result) await mutate(`/api/patients/${patient.id}?detailed=true`);
    setLoading(false);
  };

  if (loading) return <CircularProgress />;
  return (
    <Select
      //@ts-ignore
      onChange={handleChange}
      placeholder="Choose one…"
      defaultValue={defaultValue}
    >
      {diseases?.map((disease: Disease) => (
        <Option key={disease.id.toString()} value={disease.name}>
          {disease.name}
        </Option>
      ))}
    </Select>
  );
}
