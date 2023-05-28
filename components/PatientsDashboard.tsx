"use client"
import { Chip, ColorPaletteProp, IconButton, Sheet, Table, Typography } from "@mui/joy";
import { Patient } from "@prisma/client";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useEffect, useState } from "react";

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
        console.log(patients);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Sheet
            variant="outlined"
            sx={{
                width: {
                    xs: '95%',
                    sm: '95%',
                    md: '80%',
                    lg: '70%'
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
                        <th style={{ textAlign: 'center', paddingLeft: 20, verticalAlign: 'middle' }}>Nombre</th>
                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Telefono</th>
                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Mail</th>
                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Estado</th>
                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Accion</th>
                        <th style={{ paddingRight: 20, verticalAlign: 'middle', textAlign: 'right' }}>
                            <IconButton color="neutral" variant="plain">
                                <AddBoxIcon fontSize="large" />
                            </IconButton>
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
                                <Typography fontWeight="md">{patient.phone}</Typography>
                            </td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <Typography fontWeight="md">{patient.email}</Typography>
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