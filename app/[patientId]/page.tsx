"use client"

import Accordion from "@/components/Common/Accordion";
import AffiliatoryDataForm from "@/components/Forms/AffiliatoryDataForm";
import GestationTable from "@/components/GestationTable";
import { Box, Chip, LinearProgress, Select, Typography, Option, Sheet, List, ListItem, ListItemButton, Card, Stack } from "@mui/joy";
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
                <Stack
                    spacing={2}
                    sx={{
                        width: '60%',
                        mr: 5
                    }}
                >

                </Stack>
                <Stack
                    spacing={2}
                >
                    <Box
                        sx={{
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: 'md'
                        }}
                    >
                        <Accordion title="Datos Afiliatorios">
                            <AffiliatoryDataForm affiliatoryData={data.patient.affiliatoryData} />
                        </Accordion>
                    </Box>
                    <Box
                        sx={{
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: 'md'
                        }}
                    >
                        <Accordion title="Sintomas">
                            <AffiliatoryDataForm affiliatoryData={data.patient.affiliatoryData} />
                        </Accordion>
                    </Box>
                    <Box
                        sx={{
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: 'md'
                        }}
                    >
                        <Accordion title="Factores de Riesgo">
                            <AffiliatoryDataForm affiliatoryData={data.patient.affiliatoryData} />
                        </Accordion>
                    </Box>
                    <Box
                        sx={{
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: 'md'
                        }}
                    >
                        <Accordion title="Gestas">
                            <GestationTable
                                patientId={data.patient.id}
                                gestations={data.patient.gestations}
                            />
                        </Accordion>
                    </Box>
                    <Box
                        sx={{
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: 'md'
                        }}
                    >
                        <Accordion title="Cirugias Previas">
                            <AffiliatoryDataForm affiliatoryData={data.patient.affiliatoryData} />
                        </Accordion>
                    </Box>
                </Stack>
            </Box >

        </Sheet >

    )
}