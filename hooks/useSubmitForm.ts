// useSubmitForm.ts
import { fetchData } from '@/utils/fetchData';
import { useState } from 'react';
import { mutate } from 'swr';

interface UseSubmitFormProps {
  entity: string;
  endpoint?: string;
  oldEntity?: any | null;
  dataModifier?: (data: any) => any; // Function to modify data
  handler?: (complication: any) => void;
  reset?: () => void;
  setModalOpen?: (isOpen: boolean) => void;
  returnEntity?: string;
  patientId?: string;
}

interface UseSubmitFormReturn {
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
}

export const useSubmitForm = ({
  entity,
  endpoint = '',
  oldEntity,
  dataModifier,
  handler,
  reset,
  setModalOpen,
  returnEntity,
  patientId,
}: UseSubmitFormProps): UseSubmitFormReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any): Promise<void> => {
    data = dataModifier ? dataModifier(data) : data;
    const method = oldEntity ? 'PUT' : 'POST';
    if (endpoint === '') endpoint = oldEntity ? `/${oldEntity.id}` : '';
    try {
      setIsLoading(true);
      const result = await fetchData(entity + endpoint, method, data);
      console.log(JSON.stringify(result, null, 2));
      if (result.status === 200 && reset) reset();
      if (handler && returnEntity) handler(result[returnEntity]);
      if (setModalOpen) setModalOpen(false);
      if (patientId) mutate(`/api/patients/${patientId}?detailed=true`, null);
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};
