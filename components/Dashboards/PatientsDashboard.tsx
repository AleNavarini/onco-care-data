"use client"
import { Chip, ColorPaletteProp, IconButton, Modal, Sheet, Table, Typography } from "@mui/joy";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useEffect, useState } from "react";
import Link from "next/link";
import PatientForm from "../Forms/PatientForm";
import { FollowUp } from "@prisma/client";

interface Props {
    patients: FullPatient[]
}

export interface FullPatient {
    id: bigint
    dni: string
    name: string | null
    dateOfBirth: string | null
    phone: string | null
    email: string | null
    address: string | null
    healthInsurance: string | null
    clinicHistory: bigint | null
    status?: string
    followUps?: FollowUp[]
}



export default function PatientsDashboard(props: Props) {
    const [patients, setPatients] = useState<FullPatient[]>(props.patients)
    const [editPatient, setEditPatient] = useState<FullPatient | null>(null)
    const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);


    useEffect(() => {
        const tempPatients: FullPatient[] = patients.map((patient: FullPatient) => {
            if (patient.followUps && patient.followUps.length > 0) return { ...patient, status: "En seguimiento" };
            return { ...patient, status: "Activa" };
        });
        setPatients(tempPatients)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const addPatient = (patient: FullPatient) => {
        const newPatient: FullPatient = {
            ...patient,
            status: "Active"
        }
        setPatients((prevPatients) => [...prevPatients, newPatient])
    }

    const updatePatient = (patient: FullPatient) => {
        setPatients((prevPatients) => prevPatients.map((p: FullPatient) => {
            if (p.id === patient.id) return { ...patient, status: "Active" }
            return p
        }))
    }

    const deletePatient = async (patient: FullPatient) => {
        let result = confirm("Seguro que quiere borrar el paciente?")
        if (!result) return
        const response = await fetch(`/api/patients/${patient.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            setPatients((prevPatients) => prevPatients.filter((p: FullPatient) => p.id !== patient.id))
        }
    }

    return (
        <Sheet
            variant="outlined"
            sx={{
                width: {
                    xs: '100%',
                    sm: '95%',
                    md: '80%',
                    lg: '75%'
                },
                mx: 'auto',
                borderRadius: 'md',
                overflow: 'auto',
                my: 2
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
                        <th style={{ width: 100, textAlign: 'center', paddingLeft: 20, verticalAlign: 'middle' }}>Nombre</th>
                        <th style={{ width: 100, textAlign: 'center', verticalAlign: 'middle' }}>Telefono</th>
                        <th style={{ width: 250, textAlign: 'center', verticalAlign: 'middle' }}>Mail</th>
                        <th style={{ width: 100, textAlign: 'center', verticalAlign: 'middle' }}>Estado</th>
                        <th style={{ width: 100, textAlign: 'center', verticalAlign: 'middle' }}>Accion</th>
                        <th style={{ width: 100, paddingRight: 20, verticalAlign: 'middle', textAlign: 'right' }}>
                            <IconButton color="neutral" variant="plain" onClick={() => setNewModalOpen(true)}>
                                <AddBoxIcon fontSize="large" />
                            </IconButton>

                            <Modal
                                aria-labelledby="New patient modal"
                                aria-describedby="New patient form"
                                open={newModalOpen}
                                onClose={() => setNewModalOpen(false)}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <PatientForm
                                    buttonText="Agregar"
                                    addPatient={addPatient}
                                    setModalOpen={setNewModalOpen}
                                />
                            </Modal >

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {patients && patients.map((patient: FullPatient) => (
                        <tr key={patient.id.toString()}>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <Typography fontWeight="md">{patient.name}</Typography>
                            </td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <Typography noWrap fontWeight="md">{patient.phone}</Typography>
                            </td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <Typography noWrap fontWeight="md">{patient.email}</Typography>
                            </td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <Chip
                                    variant="soft"
                                    size="sm"
                                    color={
                                        {
                                            Activa: 'success',
                                        }[patient.status!] as ColorPaletteProp
                                    }
                                >
                                    {patient.status}
                                </Chip>
                            </td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <IconButton color="neutral" variant="plain" onClick={() => {
                                    setEditPatient(patient)
                                    setEditModalOpen(true)
                                }}>
                                    <EditIcon />
                                </IconButton>
                                <Modal
                                    aria-labelledby="Update patient modal"
                                    aria-describedby="Update patient form"
                                    open={editModalOpen}
                                    onClose={() => setEditModalOpen(false)}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <PatientForm
                                        buttonText="Actualizar"
                                        addPatient={updatePatient}
                                        setModalOpen={setEditModalOpen}
                                        oldPatient={editPatient!}
                                    />
                                </Modal>
                                <IconButton color="neutral" variant="plain" onClick={() => deletePatient(patient)}>
                                    <DeleteIcon />
                                </IconButton>
                            </td>
                            <td style={{ paddingRight: 20, verticalAlign: 'middle', textAlign: 'right' }}>
                                <Link href={`/${patient.id}`}>
                                    <IconButton color="neutral" variant="plain">
                                        <ArrowCircleRightOutlinedIcon />
                                    </IconButton>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet >
    )
}