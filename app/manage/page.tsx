"use client"
import DiseasesDashboard from "@/components/DiseasesDashboard";
import { LinearProgress, Sheet } from "@mui/joy";
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
    return (
        <Sheet
            sx={{
                display: 'flex'
            }}
        >
            <Sheet
                sx={{
                    width: {
                        sm: '100%',
                        md: '30%'
                    }
                }}
            >

                Enfermedades
                <DiseasesDashboard diseases={diseasesData.diseases} />
            </Sheet>
            <Sheet>Tratamientos</Sheet>
            <Sheet>Estudios</Sheet>

        </Sheet>
    )
}