// useSubmitForm.ts
import { fetchData } from '@/utils/fetchData';
import { useState } from 'react';

interface UseSubmitFormProps {
  entity: string;
  endpoint?: string;
  oldEntity?: any | null;
  dataModifier?: (data: any) => any; // Function to modify data
  handler?: (complication: any) => void;
  reset?: () => void;
  setModalOpen?: (isOpen: boolean) => void;
  returnEntity?: string;
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
}: UseSubmitFormProps): UseSubmitFormReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any): Promise<void> => {
    data = dataModifier ? dataModifier(data) : data;
    const method = oldEntity ? 'PUT' : 'POST';
    if (endpoint === '') endpoint = oldEntity ? `/${oldEntity.id}` : '';
    try {
      setIsLoading(true);
      const result = await fetchData(entity + endpoint, method, data);
      if (result.status === 200 && reset) reset();
      if (handler && returnEntity) handler(result[returnEntity]);
      if (setModalOpen) setModalOpen(false);
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};
