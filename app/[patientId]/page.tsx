"use client"

import Accordion from "@/components/Common/Accordion";
import AffiliatoryDataForm from "@/components/Forms/AffiliatoryDataForm";
import { Box, Chip, LinearProgress, Select, Typography, Option, Sheet, List, ListItem, ListItemButton, Card } from "@mui/joy";
import { AffiliatoryData } from "@prisma/client";
import { useState } from "react";
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
    const { data, isLoading, error } = useSWR(`/api/patients/${id}?detailed=true`, getPatient, { refreshInterval: 1000 });


    if (error) return <h1>Ha ocurrido un error ... </h1>
    if (isLoading) return <LinearProgress />

    return (
        <Sheet
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <pre>{JSON.stringify(data.patient, null, 2)}</pre>
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

            <Box
                sx={{
                    display: 'flex',
                    my: 5
                }}
            >

                <Accordion title="Datos Afiliatorios">
                    <AffiliatoryDataForm affiliatoryData={data.patient.affiliatoryData} />
                </Accordion>
            </Box>

        </Sheet >

    )
}