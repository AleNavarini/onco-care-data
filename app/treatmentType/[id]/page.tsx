"use client"
import TreatmentTypeAttributesDashboard from "@/components/Dashboards/TreatmentTypeAttributesDashboard";
import { LinearProgress, Sheet, Typography } from "@mui/joy";
import { TreatmentType, TreatmentTypeAttribute } from "@prisma/client";
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

interface FullTreatmentType extends TreatmentType {
    attributes?: TreatmentTypeAttribute[]
}

export default function TreatmentTypePage({ params }: Props) {
    const id = params.id
    const { data, isLoading, error } = useSWR(`/api/treatment-types/${id}`, fetchData, { refreshInterval: 5000 });
    const treatmentType: FullTreatmentType = data?.treatmentType
    if (isLoading) {
        return <LinearProgress />
    }

    if (error) {
        return <h1>Ha habido un error ...</h1>
    }

    const filteredAttributes = treatmentType.attributes?.filter((a: TreatmentTypeAttribute) => a.value === null)
    return (
        <>
            <Typography level="h2">Atributos - <b>{treatmentType.name}</b></Typography>
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
                <TreatmentTypeAttributesDashboard
                    forPatient={false}
                    treatmentTypeAttributes={filteredAttributes!}
                    treatmentTypeId={id}
                />

            </Sheet>
        </>
    )
}