import PreviousSurgeryForm from './previous-surgery-form';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import { columns } from './previous-surgeries.columns';
import AddButton from '../common/add-button';
import Datagrid from '../table/datagrid';
import CenteredLoading from '../ui/centered-loading';

interface Props {
  patientId: string;
}

export default function PreviousSurgeriesTable({ patientId }: Props) {
  const { data, isLoading } = useSWR(
    `/api/v2/patients/${patientId}/previous-surgeries`,
    fetcher
  );
  if (isLoading) return <CenteredLoading />;

  const previousSurgeries = data.data;
  return (
    <div className="flex flex-col gap-4 items-end">
      <AddButton
        text="Crear Cirugia Previa"
        form={
          <PreviousSurgeryForm
            patientId={patientId}
            customMutate={`/api/v2/patients/${patientId}/previous-surgeries`}
          />
        }
      />
      <Datagrid rows={previousSurgeries} columns={columns} />
    </div>
  );
}
