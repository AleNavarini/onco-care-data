import { Button, Sheet, Stack } from "@mui/joy";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import { StudyTypeAttribute } from "@prisma/client";

interface Props {
    buttonText: string
    oldStudyTypeAttribute?: StudyTypeAttribute
    studyTypeId: string
    studyId?: string
    handler?: (riskFactor: StudyTypeAttribute) => void
    setModalOpen: (state: boolean) => void
}

export default function StudyTypeAttributeForm(props: Props) {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        data = { ...data, studyTypeId: props.studyTypeId }

        try {
            setIsLoading(true);
            const endpoint = props.oldStudyTypeAttribute ? `/${props.oldStudyTypeAttribute.id}` : ""
            const response = await fetch(`/api/study-types-attributes${endpoint}`, {
                method: props.oldStudyTypeAttribute ? "PUT" : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.status === 200) reset();
            if (props.handler) {
                props.handler(result.studyTypeAttribute)
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
                        defaultValue={props.oldStudyTypeAttribute?.id}
                    />
                    <Field
                        fieldName="name"
                        label="Nombre"
                        placeholder="Nombre del atributo"
                        register={register}
                        type="text"
                        required={true}
                        defaultValue={props.oldStudyTypeAttribute?.name}
                    />
                    {
                        props.studyId &&
                        <Field
                            fieldName="value"
                            label="Valor"
                            placeholder="Valor del atributo ..."
                            register={register}
                            type="text"
                            defaultValue={props.oldStudyTypeAttribute?.value}
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