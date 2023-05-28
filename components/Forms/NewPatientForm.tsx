import { Button, Sheet, Stack } from "@mui/joy";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import { Patient } from "@prisma/client";

interface Props {
    addPatient: (patient: Patient) => void
    setModalOpen: (state: boolean) => void
}
export default function NewPatientForm(props: Props) {

    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        try {

            setIsLoading(true);
            const response = await fetch('/api/patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.status === 200) reset();
            props.addPatient(result.patient)
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
                    xs: '90%',
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
                        fieldName="name"
                        label="Nombre"
                        placeholder="Nombre del paciente"
                        register={register}
                        type="text"
                        required={true}
                    />

                    <Field
                        fieldName="dni"
                        label="DNI"
                        placeholder="DNI"
                        register={register}
                        type="text"
                        required={true}
                    />

                    <Field
                        fieldName="dateOfBirth"
                        label="Fecha de nacimiento"
                        placeholder="Fecha de nacimiento"
                        register={register}
                        type="date"
                    />

                    <Field
                        fieldName="phone"
                        label="Teléfono"
                        placeholder="Teléfono"
                        register={register}
                        type="tel"
                    />

                    <Field
                        fieldName="email"
                        label="email"
                        placeholder="Email"
                        register={register}
                        type="email"
                    />

                    <Field
                        fieldName="address"
                        label="Domicilio"
                        placeholder="Domicilio"
                        register={register}
                        type="text"
                    />

                    <Field
                        fieldName="healthInsurance"
                        label="Obra social"
                        placeholder="Obra social"
                        register={register}
                        type="text"
                    />

                    <Field
                        fieldName="clinicHistory"
                        label="Historia Clinica"
                        placeholder="Historia clínica"
                        register={register}
                        type="number"
                    />

                </Stack>
                <Button
                    loading={isLoading}
                    sx={{
                        my: 2,
                        width: '100%'
                    }}
                    variant="solid"
                    type="submit"
                >
                    Agregar
                </Button>
            </form >
        </Sheet >
    )
}