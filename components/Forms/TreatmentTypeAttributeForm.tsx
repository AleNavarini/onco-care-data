import { Button, Sheet, Stack } from "@mui/joy";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import { TreatmentTypeAttribute } from "@prisma/client";

interface Props {
    buttonText: string
    oldTreatmentTypeAttribute?: TreatmentTypeAttribute
    treatmentTypeId: string
    treatmentId?: string
    handler?: (treatmentTypeAttribute: TreatmentTypeAttribute) => void
    setModalOpen: (state: boolean) => void
}

export default function TreatmentTypeAttributeForm(props: Props) {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        data = { ...data, treatmentTypeId: props.treatmentTypeId }

        try {
            setIsLoading(true);
            const endpoint = props.oldTreatmentTypeAttribute ? `/${props.oldTreatmentTypeAttribute.id}` : ""
            const response = await fetch(`/api/treatment-types-attributes${endpoint}`, {
                method: props.oldTreatmentTypeAttribute ? "PUT" : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.status === 200) reset();
            if (props.handler) {
                props.handler(result.treatmentTypeAttribute)
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
                        placeholder="Id del atributo"
                        register={register}
                        type="text"
                        visible={false}
                        defaultValue={props.oldTreatmentTypeAttribute?.id}
                    />
                    <Field
                        fieldName="name"
                        label="Nombre"
                        placeholder="Nombre del atributo"
                        register={register}
                        type="text"
                        required={true}
                        defaultValue={props.oldTreatmentTypeAttribute?.name}
                    />
                    {
                        props.treatmentId &&
                        <Field
                            fieldName="value"
                            label="Valor"
                            placeholder="Valor del atributo ..."
                            register={register}
                            type="text"
                            defaultValue={props.oldTreatmentTypeAttribute?.value}
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