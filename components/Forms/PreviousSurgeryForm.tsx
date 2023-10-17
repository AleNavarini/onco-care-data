import { Button, LinearProgress, Sheet, Stack } from "@mui/joy";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import { PreviousSurgery } from "@prisma/client";

interface Props {
    buttonText: string
    oldPreviousSurgery?: PreviousSurgery
    patientId: string
    addPreviousSurgery?: (previousSurgery: PreviousSurgery) => void
    setModalOpen: (state: boolean) => void
}

export default function PreviousSurgeryForm(props: Props) {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        data = { ...data, patientId: props.patientId }

        if (data.id === '') delete data.id

        try {
            setIsLoading(true);
            const endpoint = props.oldPreviousSurgery ? `/${props.oldPreviousSurgery.id}` : ""
            const response = await fetch(`/api/previous-surgeries${endpoint}`, {
                method: props.oldPreviousSurgery ? "PUT" : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.status === 200) reset();
            if (props.addPreviousSurgery) {
                props.addPreviousSurgery(result.previousSurgery)
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
                {isLoading && <LinearProgress />}
                <Stack spacing={2}>
                    <Field
                        fieldName="id"
                        label="ID"
                        placeholder="Id de la cirugia"
                        register={register}
                        type="text"
                        visible={false}
                        defaultValue={props.oldPreviousSurgery?.id}
                    />
                    <Field
                        fieldName="surgeryType"
                        label="Tipo"
                        placeholder="Tipo de cirguia"
                        register={register}
                        type="text"
                        required={true}
                        defaultValue={props.oldPreviousSurgery?.surgeryType}
                    />
                    <Field
                        fieldName="observations"
                        label="Observaciones"
                        placeholder="Observaciones"
                        register={register}
                        type="text"
                        defaultValue={props.oldPreviousSurgery?.observations}
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