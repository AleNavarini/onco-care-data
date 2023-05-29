"use client"

import { Box, Chip, LinearProgress, Select, Typography, Option } from "@mui/joy";
import useSWR from "swr";

interface Props {
    params: {
        patientId: string;
    };
}

const getPatient = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export default function PatientPage({ params }: Props) {
    const id = params.patientId
    const { data, isLoading, error } = useSWR(`/api/patients/${id}`, getPatient);
    if (error) return <h1>Ha ocurrido un error ... </h1>
    if (isLoading) return <LinearProgress />

    return (
        <Box sx={{
            display: 'flex',
            width: '90%',
            justifyContent: 'space-between'
        }}>

            <Typography level="h2">{data.patient.name}</Typography>
            <Select
                sx={{
                    width: '20dvw'
                }}
                placeholder="Choose one…"
                size="lg"
            >
                <Option value={"Cancer de Ovario"}>Cancer de Ovario</Option>
                <Option value={"Cancer de Vulva y Vagina"}>Cancer de Vulva y Vagina</Option>
                <Option value={"Cancer de Endometrio"}>Cancer de Endometrio</Option>
            </Select>
            <Chip
                sx={{
                    width: '10dvw',
                    textAlign: 'center'
                }}

                variant="soft"
                size="lg"
                color="success"
            >
                Active
            </Chip>

        </Box>
    )
}