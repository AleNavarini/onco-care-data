"use client"
import DiseasesDashboard from "@/components/Dashboards/DiseasesDashboard";
import { LinearProgress, Sheet } from "@mui/joy";
import { Disease } from "@prisma/client";
import useSWR from "swr";

const getDiseases = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export default function ManagePage() {
    const {
        data: diseasesData,
        isLoading: diseasesLoading,
        error: diseasesError } = useSWR(`/api/diseases`, getDiseases, { refreshInterval: 5000 });


    if (diseasesError) return <h1>Ha ocurrido un error ... </h1>
    if (diseasesLoading) return <LinearProgress />

    const filteredDiseases = diseasesData?.diseases?.filter((d: Disease) => d.patientId === null)
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
                    mx: 5
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
                    mx: 5
                }}
            >Tratamientos</Sheet>
            <Sheet
                sx={{
                    width: {
                        md: '100%',
                        lg: '30%'
                    },
                    mx: 5
                }}
            >Estudios</Sheet>

        </Sheet>
    )
}