"use client"
import { Chip, ColorPaletteProp, IconButton, Modal, ModalClose, ModalDialog, Sheet, Table, Typography } from "@mui/joy";
import { Patient } from "@prisma/client";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useEffect, useState } from "react";
import NewPatientForm from "./Forms/NewPatientForm";

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

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const addPatient = (patient: Patient) => {
        const newPatient: PatientWithStatus = {
            ...patient,
            status: "Active"
        }
        setPatients((prevPatients) => [...prevPatients, newPatient])

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
                            <IconButton color="neutral" variant="plain" onClick={() => setModalOpen(true)}>
                                <AddBoxIcon fontSize="large" />
                            </IconButton>

                            <Modal
                                aria-labelledby="New patient modal"
                                aria-describedby="New patient form"
                                open={modalOpen}
                                onClose={() => setModalOpen(false)}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <NewPatientForm
                                    addPatient={addPatient}
                                    setModalOpen={setModalOpen}
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
                                <IconButton color="neutral" variant="plain">
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="neutral" variant="plain">
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