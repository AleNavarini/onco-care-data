import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, IconButton, Modal, Typography, Sheet } from "@mui/joy";
import { Gestation } from "@prisma/client";
import { useState } from "react";
import GestationForm from './Forms/GestationForm';

interface Props {
    patientId: string
    gestations: Gestation[]
}

export default function GestationTable({ patientId, gestations: initialGestations }: Props) {
    const [gestations, setGestations] = useState<Gestation[]>(initialGestations)
    const [editGestation, setEditGestation] = useState<Gestation | null>(null)
    const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    const addGestation = (gestation: Gestation) => setGestations((prevGestations) => [...prevGestations, gestation])

    const updateGestation = (gestation: Gestation) => {
        setGestations((prevGestations) => prevGestations.map((g: Gestation) => {
            if (g.id === gestation.id) return gestation
            return g
        }))
    }

    const deleteGestation = async (gestation: Gestation) => {
        const response = await fetch(`/api/gestations/${gestation.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            setGestations((prevGestations) => prevGestations.filter((g: Gestation) => g.id !== gestation.id))
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
                            gestations.length > 0 &&
                            <>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Parto</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Aborto</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Cesarea</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Accion</th>
                            </>
                        }
                        <th style={{ paddingRight: 20, verticalAlign: 'middle', textAlign: 'right' }}>
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
                                <GestationForm
                                    patientId={patientId}
                                    buttonText="Agregar"
                                    addGestation={addGestation}
                                    setModalOpen={setNewModalOpen}
                                />
                            </Modal >

                        </th>
                    </tr >
                </thead >
                <tbody>
                    {gestations && gestations.length > 0 && gestations.map((gestation: Gestation) => (
                        <tr key={gestation.id.toString()}>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <Typography fontWeight="md">{gestation.birth ? "Si" : "No"}</Typography>
                            </td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <Typography noWrap fontWeight="md">{gestation.abortion ? "Si" : "No"}</Typography>
                            </td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <Typography noWrap fontWeight="md">{gestation.cesarean ? "Si" : "No"}</Typography>
                            </td>

                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <IconButton color="neutral" variant="plain" onClick={() => {
                                    setEditGestation(gestation)
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
                                    <GestationForm
                                        patientId={patientId}
                                        buttonText="Actualizar"
                                        addGestation={updateGestation}
                                        setModalOpen={setEditModalOpen}
                                        oldGestation={editGestation!}
                                    />
                                </Modal>
                                <IconButton
                                    color="neutral"
                                    variant="plain"
                                    onClick={() => {
                                        var result = confirm("Want to delete?");
                                        if (!result) return
                                        deleteGestation(gestation)
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table >
        </Sheet >

    )
}