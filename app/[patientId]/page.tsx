"use client"

interface Props {
    params: {
        patientId: string;
    };
}

export default function PatientPage({ params }: Props) {
    return (
        <div>
            <h1>{`Patient : ${params.patientId}`}</h1>
        </div>
    )
}