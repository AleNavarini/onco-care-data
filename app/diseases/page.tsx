"use client"
import DiseasesDashboard from "@/components/Dashboards/DiseasesDashboard";
import StudyTypesDasboard from "@/components/Dashboards/StudyTypesDasboard";
import { LinearProgress, Sheet } from "@mui/joy";
import { Disease } from "@prisma/client";
import useSWR from "swr";


export default function ManagePage() {
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
            Trabajo en progreso

        </Sheet>
    )
}