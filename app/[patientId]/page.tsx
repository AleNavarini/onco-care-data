"use client"

import Accordion from "@/components/Common/Accordion";
import AffiliatoryDataForm from "@/components/Forms/AffiliatoryDataForm";
import RiskFactorsDashboard from "@/components/RiskFactorsDashboard";
import GestationTable from "@/components/Tables/GestationTable";
import PreviousSurgeriesTable from "@/components/Tables/PreviousSurgeriesTable";
import SymptomsTable from "@/components/Tables/SymptomsTable";
import { Box, Chip, LinearProgress, Select, Typography, Option, Sheet, List, ListItem, ListItemButton, Card, Stack, linearProgressClasses } from "@mui/joy";
import { Disease } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";
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

const getDiseases = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export default function PatientPage({ params }: Props) {
    const id = params.patientId
    const { data, isLoading, error } = useSWR(`/api/patients/${id}?detailed=true`, getPatient, { refreshInterval: 5000 });
    const {
        data: diseasesData,
        isLoading: diseasesLoading,
        error: diseasesError } = useSWR(`/api/diseases`, getDiseases, { refreshInterval: 5000 });
    const [loading, setLoading] = useState(false)

    if (error) return <h1>Ha ocurrido un error ... </h1>
    if (isLoading) return <LinearProgress />


    const handleChange = async (_e: null, value: string) => {
        let proceed: boolean = confirm("Deseas cambiar la enfermedad? Esto va a borrar los factores de riesgos cargados si ya los hay")
        if (!proceed) return
        const submitData: any = {
            name: value,
            patientId: id
        }
        if (data.patient.disease) {
            submitData.deleteRiskFactors = true
            setLoading(true)
            const response = await fetch(`/api/patient-disease`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            });
            setLoading(false)
        } else {
            setLoading(true)
            const response = await fetch(`/api/diseases`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            });
            setLoading(false)
        }

    }

    const filteredDiseases = diseasesData?.diseases?.filter((d: Disease) => d.patientId === null)
    return (
        <Sheet
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {loading &&
                <Sheet
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        mx: 'auto',
                        height: '100dvh',
                        zIndex: 2222222,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <LinearProgress />
                </Sheet>
            }
            {/* First row */}
            <Box sx={{
                display: 'flex',
                width: {
                    sm: '100%',
                    md: '90%'
                },
                justifyContent: 'space-between'
            }}>
                <Typography sx={{ width: 'fit-content' }} level="h2">{data.patient.name}</Typography>
                <Select
                    onChange={handleChange}
                    sx={{
                        width: {
                            sm: 'auto',
                            md: '20dvw'
                        }
                    }}
                    placeholder="Choose one…"
                    defaultValue={data.patient?.disease?.name}
                >
                    {diseasesData.diseases && filteredDiseases.map((disease: Disease) => (
                        <Option key={disease.id.toString()} value={disease.name}>{disease.name}</Option>
                    ))}
                </Select>
                <Chip
                    sx={{
                        width: {
                            sm: 'auto',
                            md: '10dvw'
                        },
                        ml: 1,
                        textAlign: 'center'
                    }}

                    variant="soft"
                    size="lg"
                    color="success"
                >
                    Active
                </Chip>
            </Box>
            {/* End of First row */}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {
                        xs: 'column',
                        sm: 'column',
                        md: 'row'
                    },
                    width: '95%',
                    my: 5,
                    mr: 'auto'
                }}
            >
                <Stack
                    spacing={2}
                    sx={{
                        width: {
                            xs: '100%',
                            sm: '100%',
                            md: '60%',
                            lg: '70%',
                            xl: '80%',
                        },
                        mx: 'auto',
                        mb: 2
                    }}
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
                </Stack>
                <Stack
                    spacing={2}
                    sx={{
                        width: {
                            xs: '100%',
                            sm: '100%',
                            md: '40%',

                        },
                        mx: {
                            xs: 'auto',
                            sm: 'auto',
                            md: 'auto',
                            lg: 'auto',
                            xl: 5,
                        }

                    }}
                >
                    <Box
                        sx={{
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: 'md',
                            width: '100%'
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
                            <SymptomsTable
                                patientId={data.patient.id}
                                symptoms={data.patient.symptoms}
                            />
                        </Accordion>
                    </Box>
                    <Box
                        sx={{
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: 'md'
                        }}
                    >
                        <Accordion title="Factores de Riesgo">
                            <RiskFactorsDashboard
                                forPatient={true}
                                riskFactors={data.patient.riskFactors}
                                diseaseId={data.patient.dise}
                            />
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
                            <PreviousSurgeriesTable
                                patientId={data.patient.id}
                                previousSurgeries={data.patient.previousSurgeries}
                            />
                        </Accordion>
                    </Box>
                </Stack>
            </Box >

        </Sheet >

    )
}