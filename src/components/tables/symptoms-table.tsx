import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import AddButton from '../common/add-button';
import Datagrid from '../table/datagrid';
import SymptomForm from '../forms/symptom-form';
import { columns } from '@/components/symptoms/symptoms.colums';
interface Props {
  patientId: string;
}

export default function SymptomsTable({ patientId }: Props) {
  const { data } = useSWR(`/api/patients/symptoms/${patientId}`, fetcher, {
    suspense: true,
  });
  console.log(data);

  return (
    <div className="flex flex-col gap-4 items-end">
      <AddButton
        text="Crear Sintoma"
        form={
          <SymptomForm
            patientId={patientId}
            customMutate={`/api/patients/symptoms/${patientId}`}
          />
        }
      />
      <Datagrid rows={data.data} columns={columns} />
    </div>
  );
}
