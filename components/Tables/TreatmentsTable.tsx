import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, IconButton, Modal, Typography, Sheet } from "@mui/joy";
import { Treatment } from "@prisma/client";
import { useState } from "react";
import TreatmentForm from '../Forms/TreatmentForm';


interface Props {
    patientId: string
    treatments: Treatment[]
}

export default function TreatmentsTable({ patientId, treatments: initialTreatments }: Props) {
    const [treatments, setTreatments] = useState<Treatment[]>(initialTreatments)
    const [editTreatment, setEditTreatment] = useState<Treatment | null>(null)
    const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    const addTreatment = (treatment: Treatment) => setTreatments((prevTreatments) => [...prevTreatments, treatment])

    const updateTreatment = (treatment: Treatment) => {
        setEditTreatment(treatment)
        setTreatments((prevTreatments) => prevTreatments.map((t: Treatment) => {
            if (t.id === treatment.id) return treatment
            return t
        }))
    }

    const deleteTreatment = async (treatment: Treatment) => {
        const response = await fetch(`/api/treatments/${treatment.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            setTreatments((prevTreatments) => prevTreatments.filter((t: Treatment) => t.id !== treatment.id))
        }
    }
    return (
        <Sheet
            sx={{
                width: '100%'
            }}
        >
            <Table
                stickyHeader
                hoverRow
                sx={{
                    '--TableCell-headBackground': (theme) =>
                        theme.vars.palette.background.level1,
                    '--Table-headerUnderlineThickness': '1px',
                    '--TableRow-hoverBackground': (theme) =>
                        theme.vars.palette.background.level1,
                }}
            >
                <thead>
                    <tr>
                        {
                            treatments.length > 0 &&
                            <>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Fecha Inicio</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Fecha Fin</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Tipo</th>
                            </>
                        }
                        <th style={{ paddingRight: 20, verticalAlign: 'middle', textAlign: 'right' }}>
                            <IconButton color="neutral" variant="plain" onClick={() => setNewModalOpen(true)}>
                                <AddBoxIcon fontSize="large" />
                            </IconButton>

                            <Modal
                                aria-labelledby="New treatment modal"
                                aria-describedby="New treatment form"
                                open={newModalOpen}
                                onClose={() => setNewModalOpen(false)}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <TreatmentForm
                                    buttonText='Crear'
                                    patientId={patientId}
                                    setModalOpen={setNewModalOpen}
                                    handler={addTreatment}
                                />
                            </Modal >

                        </th>
                    </tr >
                </thead >
                <tbody>
                    {treatments && treatments.length > 0 && treatments.map((treatment: any) => {
                        const startDate = treatment.startDate?.toString().split('T')[0]
                        const endDate = treatment.endDate?.toString().split('T')[0]

                        return (
                            <tr key={treatment.id.toString()}>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <Typography fontWeight="md">{startDate}</Typography>
                                </td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <Typography fontWeight="md">{endDate}</Typography>
                                </td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <Typography fontWeight="md">{treatment.treatmentType?.name}</Typography>
                                </td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <IconButton color="neutral" variant="plain" onClick={() => {
                                        setEditTreatment(treatment)
                                        setEditModalOpen(true)
                                    }}>
                                        <EditIcon />
                                    </IconButton>
                                    <Modal
                                        aria-labelledby="Update treatment modal"
                                        aria-describedby="Update treatment form"
                                        open={editModalOpen}
                                        onClose={() => setEditModalOpen(false)}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <TreatmentForm
                                            buttonText='Actualizar'
                                            oldTreatment={editTreatment!}
                                            patientId={patientId}
                                            setModalOpen={setNewModalOpen}
                                            handler={updateTreatment}
                                        />
                                    </Modal>
                                    <IconButton
                                        color="neutral"
                                        variant="plain"
                                        onClick={() => {
                                            var result = confirm("Quiere borrar el seguimiento?");
                                            if (!result) return
                                            deleteTreatment(treatment)
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table >
        </Sheet >

    )
}