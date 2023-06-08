import { Button, Sheet, Stack } from "@mui/joy";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import { TreatmentTypeResult } from "@prisma/client";

interface Props {
    buttonText: string
    oldTreatmentTypeResult?: TreatmentTypeResult
    treatmentTypeId: string
    treatmentId?: string
    handler?: (treatmentTypeResult: TreatmentTypeResult) => void
    setModalOpen: (state: boolean) => void
}

export default function TreatmentTypeResultForm(props: Props) {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        data = { ...data, treatmentTypeId: props.treatmentTypeId }

        try {
            setIsLoading(true);
            const endpoint = props.oldTreatmentTypeResult ? `/${props.oldTreatmentTypeResult.id}` : ""
            const response = await fetch(`/api/treatment-types-results${endpoint}`, {
                method: props.oldTreatmentTypeResult ? "PUT" : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.status === 200) reset();
            if (props.handler) {
                props.handler(result.treatmentTypeResult)
            }
            props.setModalOpen(false)
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
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
                        placeholder="Id del resultado"
                        register={register}
                        type="text"
                        visible={false}
                        defaultValue={props.oldTreatmentTypeResult?.id}
                    />
                    <Field
                        fieldName="name"
                        label="Nombre"
                        placeholder="Nombre del resultado"
                        register={register}
                        type="text"
                        required={true}
                        defaultValue={props.oldTreatmentTypeResult?.name}
                    />
                    {
                        props.treatmentId &&
                        <Field
                            fieldName="value"
                            label="Valor"
                            placeholder="Valor del resultado ..."
                            register={register}
                            type="text"
                            defaultValue={props.oldTreatmentTypeResult?.value}
                        />
                    }
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