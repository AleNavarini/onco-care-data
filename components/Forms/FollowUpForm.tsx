import { Button, FormControl, FormLabel, Input, LinearProgress, Radio, RadioGroup, Sheet, Stack } from "@mui/joy";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import { FollowUp } from "@prisma/client";

interface Props {
    buttonText: string
    oldFollowUp?: FollowUp
    patientId: string
    handler?: (followUp: FollowUp) => void
    setModalOpen: (state: boolean) => void
}

export default function FollowUpForm(props: Props) {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        data = { ...data, patientId: props.patientId }
        try {
            setIsLoading(true);
            const endpoint = props.oldFollowUp ? `/${props.oldFollowUp.id}` : ""
            const response = await fetch(`/api/follow-ups${endpoint}`, {
                method: props.oldFollowUp ? "PUT" : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.status === 200) reset();
            if (props.handler) props.handler(result.followUp)
            props.setModalOpen(false)
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const dateString = props.oldFollowUp?.date.toString()
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
                        placeholder="Id de la gesta"
                        register={register}
                        type="text"
                        visible={false}
                        defaultValue={props.oldFollowUp?.id}
                    />
                    <Field
                        fieldName="date"
                        label="Fecha"
                        placeholder="Fecha del seguimiento"
                        register={register}
                        type="date"
                        defaultValue={dateString?.split('T')[0]}
                        required={true}
                    />
                    {
                        props.buttonText !== "Agregar" &&
                        <>
                            <FormControl>
                                <FormLabel
                                    sx={(theme) => ({
                                        '--FormLabel-color': theme.vars.palette.primary.plainColor,
                                    })}>
                                    Se presentó
                                </FormLabel>
                                <RadioGroup
                                    name="option"
                                    orientation="horizontal"
                                    defaultValue={props.oldFollowUp?.attended?.toString() || "true"}
                                >
                                    <Radio  {...register("attended")} value={"true"} label="Si" />
                                    <Radio  {...register("attended")} value={"false"} label="No" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel
                                    sx={(theme) => ({
                                        '--FormLabel-color': theme.vars.palette.primary.plainColor,
                                    })}>
                                    Tiene enfermedad
                                </FormLabel>
                                <RadioGroup
                                    name="option"
                                    orientation="horizontal"
                                    defaultValue={props.oldFollowUp?.hasDisease?.toString() || "false"}
                                >
                                    <Radio  {...register("hasDisease")} value={"true"} label="Si" />
                                    <Radio  {...register("hasDisease")} value={"false"} label="No" />
                                </RadioGroup>
                            </FormControl>
                            <Field
                                fieldName="recurrenceSite"
                                label="Sitio de Recidiva"
                                placeholder="Sitio de la recidiva ..."
                                register={register}
                                type="text"
                                defaultValue={props.oldFollowUp?.recurrenceSite}
                            />
                            <FormControl>
                                <FormLabel
                                    sx={(theme) => ({
                                        '--FormLabel-color': theme.vars.palette.primary.plainColor,
                                    })}>
                                    Murio
                                </FormLabel>
                                <RadioGroup
                                    name="option"
                                    orientation="horizontal"
                                    defaultValue={props.oldFollowUp?.died?.toString() || "false"}
                                >
                                    <Radio  {...register("died")} value={"true"} label="Si" />
                                    <Radio  {...register("died")} value={"false"} label="No" />
                                </RadioGroup>
                            </FormControl>
                            <Field
                                fieldName="causeOfDeath"
                                label="Causa de Muerte"
                                placeholder="Causa de la muerte ..."
                                register={register}
                                type="text"
                                defaultValue={props.oldFollowUp?.causeOfDeath}
                            />
                            <Field
                                fieldName="observations"
                                label="Observaciones"
                                placeholder="Observaciones ..."
                                register={register}
                                type="text"
                                defaultValue={props.oldFollowUp?.observations}
                            />
                        </>
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