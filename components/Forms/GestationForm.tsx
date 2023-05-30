import { Button, FormControl, FormLabel, Input, Radio, RadioGroup, Sheet, Stack } from "@mui/joy";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import { Gestation } from "@prisma/client";

interface Props {
    buttonText: string
    oldGestation?: Gestation
    patientId: string
    addGestation?: (gestation: Gestation) => void
    setModalOpen: (state: boolean) => void
}

export default function GestationForm(props: Props) {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        data = { ...data, patientId: props.patientId }

        const key = data.type
        let submitData: any = {
            patientId: props.patientId,
        }
        submitData[key] = true
        console.log(submitData);

        try {
            setIsLoading(true);
            const endpoint = props.oldGestation ? `/${props.oldGestation.id}` : ""
            const response = await fetch(`/api/gestations${endpoint}`, {
                method: props.oldGestation ? "PUT" : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            });
            const result = await response.json();
            if (result.status === 200) reset();
            if (props.addGestation) props.addGestation(result.gestation)
            props.setModalOpen(false)
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    function getDefaultValue(gestation: Gestation | undefined) {
        if (!gestation) return ""
        if (gestation.abortion) return "abortion"
        if (gestation.birth) return "birth"
        if (gestation.cesarean) return "cesarean"
    }
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
                    />
                    <FormControl>
                        <FormLabel
                            sx={(theme) => ({
                                '--FormLabel-color': theme.vars.palette.primary.plainColor,
                            })}>
                            Gesta
                        </FormLabel>
                        <RadioGroup name="option" defaultValue={getDefaultValue(props.oldGestation)} >
                            <Radio  {...register("type")} value={"birth"} label="Parto" />
                            <Radio  {...register("type")} value={"abortion"} label="Aborto" />
                            <Radio  {...register("type")} value={"cesarean"} label="Cesarea" />
                        </RadioGroup>

                    </FormControl>
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