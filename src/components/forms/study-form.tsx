import { Stack, Select, Option, CircularProgress } from '@mui/joy';
import Field from './field';
import { useForm } from 'react-hook-form';
import { Suspense, useState } from 'react';
import '@/lib/big-int-extensions';
import useSWR from 'swr';
import { Study, StudyType, StudyTypeAttribute } from '@prisma/client';
import SubmitButton from '../common/submit-button';
import { useSubmitForm } from '@/hooks/use-submit-form';
import fetcher from '@/utils/fetcher';

interface FullStudyType extends StudyType {
  attributes: StudyTypeAttribute[];
}

interface Props {
  patientId: string;
  setModalOpen?: (state: boolean) => void;
  oldStudy?: any;
  handler?: (study: Study) => void;
}

export default function StudyForm({
  patientId,
  setModalOpen,
  oldStudy,
  handler,
}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [selectedStudyType, setSelectedStudyType] = useState(
    oldStudy ? oldStudy.studyTypeId : '',
  );

  const { data: studyTypesData } = useSWR(`/api/study-types`, fetcher, {
    suspense: true,
  });
  const studyTypes: FullStudyType[] = studyTypesData?.studyTypes;
  const studyTypeAttributes = studyTypes?.filter(
    (st: FullStudyType) => st.id.toString() === selectedStudyType,
  )[0]?.attributes;

  const handleChange = async (_e: null, value: string) => {
    setSelectedStudyType(value);
  };

  const dataModifier = (data: any) => ({
    ...data,
    patientId,
    studyTypeId: selectedStudyType,
  });

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'studies',
    oldEntity: oldStudy,
    returnEntity: 'study',
    dataModifier,
    reset,
    setModalOpen,
    handler,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Field
          fieldName="id"
          label="ID"
          placeholder="Id de la gesta"
          register={register}
          type="text"
          visible={false}
          defaultValue={oldStudy?.id}
        />
        <Field
          fieldName="date"
          label="Fecha"
          placeholder="Fecha del estudio"
          required={true}
          register={register}
          type="date"
          defaultValue={oldStudy?.date.toString().split('T')[0]}
        />
        <Suspense fallback={<CircularProgress />}>
          <Select
            // @ts-ignore
            onChange={handleChange}
            sx={{
              width: {
                sm: 'auto',
                md: 'auto',
              },
              overflow: 'visible',
              zIndex: 9,
            }}
            placeholder="Choose one…"
            defaultValue={oldStudy?.studyTypeId}
          >
            {studyTypes?.map((studyType: StudyType) => (
              <Option key={studyType.id.toString()} value={studyType.id}>
                {studyType?.name}
              </Option>
            ))}
          </Select>
        </Suspense>

        {studyTypeAttributes?.map((attribute: StudyTypeAttribute) => {
          const defaultValue = oldStudy?.studyTypeAttributes.filter(
            (attr: StudyTypeAttribute) => attr.name === attribute.name,
          )[0].value;
          return (
            <Field
              key={attribute.id.toString()}
              fieldName={attribute.name}
              label={attribute.name}
              placeholder={`${attribute.name}...`}
              register={register}
              type="text"
              defaultValue={defaultValue}
            />
          );
        })}
      </Stack>
      <SubmitButton isLoading={isLoading}>
        {oldStudy ? 'Actualizar' : 'Agregar'}
      </SubmitButton>
    </form>
  );
}
