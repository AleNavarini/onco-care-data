"use client"
import StudyTypeAttributesDashboard from "@/components/Dashboards/StudyTypeAttributesDashboard";
import StudyTypesDasboard from "@/components/Dashboards/StudyTypesDasboard";
import { LinearProgress, Sheet, Typography } from "@mui/joy";
import { StudyType, StudyTypeAttribute } from "@prisma/client";
import useSWR from "swr";

const fetchData = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

interface Props {
    params: {
        id: string;
    };
}

interface FullStudyType extends StudyType {
    attributes?: StudyTypeAttribute[]
}

export default function StudyTypePage({ params }: Props) {
    const id = params.id
    const { data, isLoading, error } = useSWR(`/api/study-types/${id}`, fetchData, { refreshInterval: 5000 });
    const studyType: FullStudyType = data?.studyType
    if (isLoading) {
        return <LinearProgress />
    }

    if (error) {
        return <h1>Ha habido un error ...</h1>
    }

    const filteredAttributes = studyType.attributes?.filter((a: StudyTypeAttribute) => a.value === null)
    return (
        <>
            <Typography level="h2">Atributos - <b>{studyType.name}</b></Typography>
            <Sheet
                sx={{
                    width: '90%',
                    mx: 'auto',
                    borderRadius: 'md',
                    overflow: 'auto',
                    my: 2,
                }}
                variant={'outlined'}
            >
                <StudyTypeAttributesDashboard
                    forPatient={false}
                    studyTypeAttributes={filteredAttributes!}
                    studyTypeId={id}
                />

            </Sheet>
        </>
    )
}