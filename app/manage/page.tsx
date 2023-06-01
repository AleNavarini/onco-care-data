"use client"
import DiseasesDashboard from "@/components/Dashboards/DiseasesDashboard";
import StudyTypesDasboard from "@/components/Dashboards/StudyTypesDasboard";
import { LinearProgress, Sheet } from "@mui/joy";
import { Disease } from "@prisma/client";
import useSWR from "swr";

const fetchData = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export default function ManagePage() {
    const { data: diseasesData, isLoading: diseasesLoading, error: diseasesError } = useSWR(`/api/diseases`, fetchData, { refreshInterval: 5000 });
    const { data: studyTypesData, isLoading: studyTypesLoading, error: studyTypesError } = useSWR(`/api/study-types`, fetchData, { refreshInterval: 5000 });


    const error = diseasesError || studyTypesError
    const isLoading = diseasesLoading || studyTypesLoading
    if (error) return <h1>Ha ocurrido un error ... </h1>
    if (isLoading) return <LinearProgress />

    const filteredDiseases = diseasesData?.diseases?.filter((d: Disease) => d.patientId === null)
    const studyTypes = studyTypesData?.studyTypes
    return (
        <Sheet
            sx={{
                display: 'flex',
                flexDirection: {
                    sm: 'column',
                    md: 'row'
                },
                borderRadius: 'md',
            }}
        >
            <Sheet
                sx={{
                    width: {
                        md: '100%',
                        lg: '30%'
                    },
                }}
            >

                Enfermedades
                <DiseasesDashboard diseases={filteredDiseases} />
            </Sheet>
            <Sheet
                sx={{
                    width: {
                        md: '100%',
                        lg: '30%'
                    },
                }}
            >Tratamientos</Sheet>
            <Sheet
                sx={{
                    width: {
                        md: '100%',
                        lg: '30%'
                    },
                }}
            >
                Tipos de Estudios
                <StudyTypesDasboard studyTypes={studyTypes} />

            </Sheet>

        </Sheet>
    )
}