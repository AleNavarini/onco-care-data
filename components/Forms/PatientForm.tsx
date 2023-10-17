import { Button, Select, Option, Sheet, Stack, FormControl, FormLabel, LinearProgress } from "@mui/joy";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import { FullPatient } from "../Dashboards/PatientsDashboard";

interface Props {
    buttonText: string
    oldPatient?: FullPatient
    addPatient?: (patient: FullPatient) => void
    setModalOpen: (state: boolean) => void
}

export default function PatientForm(props: Props) {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(props.oldPatient ? props.oldPatient.status : "active");

    const handleChange = async (_e: null, value: string) => {
        setSelectedStatus(value)
    }

    const onSubmit = async (data: any) => {
        data = { ...data, status: selectedStatus }
        try {
            setIsLoading(true);
            const response = await fetch('/api/patients', {
                method: props.oldPatient ? "PUT" : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.status === 200) reset();
            if (props.addPatient) props.addPatient(result.patient)
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
                        placeholder="Id del paciente"
                        register={register}
                        type="text"
                        defaultValue={props.oldPatient?.id}
                        visible={false}
                    />
                    <Field
                        fieldName="name"
                        label="Nombre"
                        placeholder="Nombre del paciente"
                        register={register}
                        type="text"
                        required={true}
                        defaultValue={props.oldPatient?.name}
                    />
                    <Field
                        fieldName="dni"
                        label="DNI"
                        placeholder="DNI"
                        register={register}
                        type="text"
                        required={true}
                        defaultValue={props.oldPatient?.dni}
                    />
                    <Field
                        fieldName="dateOfBirth"
                        label="Fecha de nacimiento"
                        placeholder="Fecha de nacimiento"
                        register={register}
                        type="date"
                        defaultValue={props.oldPatient?.dateOfBirth?.split('T')[0]}
                    />
                    <Field
                        fieldName="phone"
                        label="Teléfono"
                        placeholder="Teléfono"
                        register={register}
                        type="text"
                        defaultValue={props.oldPatient?.phone}
                    />
                    <Field
                        fieldName="email"
                        label="email"
                        placeholder="Email"
                        register={register}
                        type="email"
                        defaultValue={props.oldPatient?.email}
                    />
                    <Field
                        fieldName="address"
                        label="Domicilio"
                        placeholder="Domicilio"
                        register={register}
                        type="text"
                        defaultValue={props.oldPatient?.address}
                    />
                    <Field
                        fieldName="healthInsurance"
                        label="Obra social"
                        placeholder="Obra social"
                        register={register}
                        type="text"
                        defaultValue={props.oldPatient?.healthInsurance}
                    />
                    <Field
                        fieldName="clinicHistory"
                        label="Historia Clinica"
                        placeholder="Historia clínica"
                        register={register}
                        type="number"
                        defaultValue={props.oldPatient?.clinicHistory}
                    />
                    <FormControl>
                        <FormLabel
                            sx={(theme) => ({
                                '--FormLabel-color': theme.vars.palette.primary.plainColor,
                            })}
                        >
                            Estado
                        </FormLabel>
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
                            defaultValue={"active"}
                            on                        >
                            {[{ text: "Activa", value: "active" }, { text: "En seguimiento", value: "following" }].map((status: any) => (
                                <Option
                                    key={status.text}
                                    value={status.value}
                                >{status.text}</Option>
                            ))}
                        </Select>
                    </FormControl>
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
                    {props.buttonText}
                </Button>
            </form >
        </Sheet >
    )
}