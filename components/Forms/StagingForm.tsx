import { Button, FormControl, FormLabel, Input, Radio, RadioGroup, Sheet, Stack } from "@mui/joy";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import { Staging } from "@prisma/client";

interface Props {
    buttonText: string
    oldStaging?: Staging
    patientId: string
    handler?: (staging: Staging) => void
    setModalOpen: (state: boolean) => void
}

export default function StagingForm(props: Props) {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        data = { ...data, patientId: props.patientId }


        try {
            setIsLoading(true);
            const endpoint = props.oldStaging ? `/${props.oldStaging.id}` : ""
            const response = await fetch(`/api/stagings${endpoint}`, {
                method: props.oldStaging ? "PUT" : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.status === 200) reset();
            if (props.handler) props.handler(result.staging)
            props.setModalOpen(false)
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const dateString = props.oldStaging?.date.toString()
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
                        defaultValue={props.oldStaging?.id}
                    />
                    <Field
                        fieldName="date"
                        label="Fecha"
                        placeholder="Fecha de la estadificacion"
                        register={register}
                        type="date"
                        defaultValue={dateString ? dateString?.split('T')[0] : new Date().toISOString().split('T')[0]}
                    />
                    <Field
                        fieldName="type"
                        label="Tipo"
                        placeholder="Tipo de Figo (quirurjica o clinica)"
                        register={register}
                        type="text"
                        defaultValue={props.oldStaging?.type}
                    />
                    <Field
                        fieldName="figo"
                        label="FIGO"
                        placeholder="Figo"
                        register={register}
                        type="text"
                        defaultValue={props.oldStaging?.figo}
                    />

                </Stack >
                <Button
                    loading={isLoading}
                    sx={{
                        my: 2,
                        width: '100%'
                    }}
                    variant="solid"
                    type="submit"
                >
                    {props.buttonText}
                </Button>
            </form >
        </Sheet >
    )
}