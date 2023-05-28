"use client"
import { Chip, ColorPaletteProp, IconButton, Modal, ModalClose, ModalDialog, Sheet, Table, Typography } from "@mui/joy";
import { Patient } from "@prisma/client";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useEffect, useState } from "react";
import PatientForm from "./Forms/PatientForm";

interface Props {
    patients: PatientWithStatus[]
}

interface PatientWithStatus extends Patient {
    status?: string
}


export default function PatientsDashboard(props: Props) {
    const [patients, setPatients] = useState<PatientWithStatus[]>(props.patients)
    useEffect(() => {
        const tempPatients: PatientWithStatus[] = patients.map((patient: Patient) => {
            return { ...patient, status: "Active" };
        });
        setPatients(tempPatients)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    const addPatient = (patient: Patient) => {
        const newPatient: PatientWithStatus = {
            ...patient,
            status: "Active"
        }
        setPatients((prevPatients) => [...prevPatients, newPatient])
    }

    const updatePatient = (patient: Patient) => {
        setPatients((prevPatients) => prevPatients.map((p: PatientWithStatus) => {
            if (p.id === patient.id) return { ...patient, status: "Active" }
            return p
        }))
    }

    const deletePatient = async (patient: Patient) => {
        const response = await fetch(`/api/patients/${patient.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            setPatients((prevPatients) => prevPatients.filter((p: PatientWithStatus) => p.id !== patient.id))
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
                flex: '1',
                minHeight: 0,
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
                                    addPatient={addPatient}
                                    setModalOpen={setNewModalOpen}
                                />
                            </Modal >

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {patients && patients.map((patient: PatientWithStatus) => (
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
                                            Active: 'success',
                                        }[patient.status!] as ColorPaletteProp
                                    }
                                >
                                    {patient.status}
                                </Chip>
                            </td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <IconButton color="neutral" variant="plain" onClick={() => setEditModalOpen(true)}>
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
                                        addPatient={updatePatient}
                                        setModalOpen={setEditModalOpen}
                                        oldPatient={patient}
                                    />
                                </Modal>
                                <IconButton color="neutral" variant="plain" onClick={() => deletePatient(patient)}>
                                    <DeleteIcon />
                                </IconButton>
                            </td>
                            <td style={{ paddingRight: 20, verticalAlign: 'middle', textAlign: 'right' }}>
                                <IconButton color="neutral" variant="plain">
                                    <ArrowCircleRightOutlinedIcon />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet >
    )
}