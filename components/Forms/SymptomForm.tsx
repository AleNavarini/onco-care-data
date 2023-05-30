import { Button, FormControl, FormLabel, Input, Radio, RadioGroup, Sheet, Stack } from "@mui/joy";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import { Symptom } from "@prisma/client";

interface Props {
    buttonText: string
    oldSymptom?: Symptom
    patientId: string
    addSymptom?: (symptom: Symptom) => void
    setModalOpen: (state: boolean) => void
}

export default function SymptomForm(props: Props) {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        data = { ...data, patientId: props.patientId }

        if (data.id === '') delete data.id

        try {
            setIsLoading(true);
            const endpoint = props.oldSymptom ? `/${props.oldSymptom.id}` : ""
            const response = await fetch(`/api/symptoms${endpoint}`, {
                method: props.oldSymptom ? "PUT" : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.status === 200) reset();
            if (props.addSymptom) props.addSymptom(result.symptom)
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
                        placeholder="Id del sintoma"
                        register={register}
                        type="text"
                        visible={false}
                        defaultValue={props.oldSymptom?.id}
                    />
                    <Field
                        fieldName="name"
                        label="Nombre"
                        placeholder="Nombre del sintoma"
                        register={register}
                        type="text"
                        required={true}
                        defaultValue={props.oldSymptom?.name}
                    />
                    <Field
                        fieldName="value"
                        label="Valor"
                        placeholder="Valor del sintoma ... (opcional)"
                        register={register}
                        type="text"
                        defaultValue={props.oldSymptom?.value}
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