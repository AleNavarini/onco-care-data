import { Sheet, Stack, Button, Select, Option, Input } from "@mui/joy";
import Field from "./Field";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "../../lib/bigIntExtensions"
import useSWR from "swr";
import { Study, StudyType, StudyTypeAttribute } from "@prisma/client";
import React from "react";

const fetchData = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

interface FullStudyType extends StudyType {
    attributes: StudyTypeAttribute[]
}

interface Props {
    buttonText: string
    patientId: string
    setModalOpen: (state: boolean) => void
    oldStudy?: any
    handler?: (study: Study) => void
}

export default function StudyForm({ buttonText, patientId, setModalOpen, oldStudy, handler }: Props) {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [selectedStudyType, setSelectedStudyType] = useState(oldStudy ? oldStudy.studyTypeId : "");

    const {
        data: studyTypesData,
        isLoading,
        error
    } = useSWR(`/api/study-types`, fetchData, { refreshInterval: 5000 });
    const studyTypes: FullStudyType[] = studyTypesData?.studyTypes
    const studyTypeAttributes = studyTypes?.filter((st: FullStudyType) => st.id.toString() === selectedStudyType)[0]?.attributes


    const handleChange = async (_e: null, value: string) => {
        setSelectedStudyType(value)
    }

    const onSubmit = async (data: any) => {
        data = { ...data, patientId, studyTypeId: selectedStudyType }

        try {
            setLoading(true);
            const endpoint = oldStudy ? `/${oldStudy.id}` : ""
            const response = await fetch(`/api/studies${endpoint}`, {
                method: oldStudy ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (response.ok) {
                reset();
            }
            if (handler) handler(result.study)
            setModalOpen(false)
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Sheet
            variant="outlined"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: {
                    sm: '90%',
                    md: '60%',
                    lg: '50%',
                    xl: '30%',
                },
                p: 5,
                borderRadius: 'md',
            }}
        >
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

                    <Select

                        // @ts-ignore
                        onChange={handleChange}
                        sx={{
                            width: {
                                sm: 'auto',
                                md: '20dvw'
                            }
                        }}
                        placeholder="Choose one…"
                        defaultValue={oldStudy?.studyTypeId}
                    >
                        {studyTypes && studyTypes.map((studyType: StudyType) => (
                            <Option
                                key={studyType.id.toString()}
                                value={studyType.id}
                            >{studyType?.name}</Option>
                        ))}
                    </Select>

                    {studyTypeAttributes && studyTypeAttributes.map((attribute: StudyTypeAttribute) => {
                        const defaultValue = oldStudy?.studyTypeAttributes.filter((attr: StudyTypeAttribute) => attr.name === attribute.name)[0].value
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
                        )
                    })}


                </Stack>
                <Button
                    loading={loading}
                    sx={{
                        my: 2,
                        width: '100%'
                    }}
                    variant="solid"
                    type="submit"
                >
                    {buttonText}
                </Button>
            </form >
        </Sheet >
    )
}