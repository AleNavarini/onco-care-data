"use client"
import { IconButton, Modal, Sheet, Table, Typography } from "@mui/joy";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useState } from "react";
import Link from "next/link";
import { Disease } from "@prisma/client";
import DiseaseForm from "../Forms/DiseaseForm";

interface Props {
    diseases: Disease[]
}

export default function DiseasesDashboard(props: Props) {
    const [diseases, setDiseases] = useState<Disease[]>(props.diseases)
    const [editDisease, setEditDisease] = useState<Disease | null>(null)
    const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    const addDisease = (disease: Disease) => setDiseases((prevDiseases) => [...prevDiseases, disease])

    const updateDisease = (disease: Disease) => {
        setDiseases((prevDiseases) => prevDiseases.map((d: Disease) => {
            if (d.id === disease.id) return disease
            return d
        }))
    }

    const deleteDisease = async (disease: Disease) => {
        let result = confirm("Seguro que quiere borrar la enfermedad?")
        if (!result) return
        const response = await fetch(`/api/diseases/${disease.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            setDiseases((prevDiseases) => prevDiseases.filter((d: Disease) => d.id !== disease.id))
        }
    }

    return (
        <Sheet
            variant="outlined"
            sx={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: 'md'
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
                        <th style={{ width: 100, textAlign: 'center', paddingLeft: 20, verticalAlign: 'middle' }}>Enfermedad</th>
                        <th style={{ width: 100, textAlign: 'center', verticalAlign: 'middle' }}>Accion</th>
                        <th style={{ width: 100, paddingRight: 20, verticalAlign: 'middle', textAlign: 'right' }}>
                            <IconButton color="neutral" variant="plain" onClick={() => setNewModalOpen(true)}>
                                <AddBoxIcon fontSize="large" />
                            </IconButton>

                            <Modal
                                aria-labelledby="New disease modal"
                                aria-describedby="New disease form"
                                open={newModalOpen}
                                onClose={() => setNewModalOpen(false)}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <DiseaseForm
                                    buttonText="Agregar"
                                    addDisease={addDisease}
                                    setModalOpen={setNewModalOpen}
                                />
                            </Modal >

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {diseases && diseases.map((disease: Disease) => (
                        <tr key={disease.id.toString()}>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <Typography fontWeight="md">{disease.name}</Typography>
                            </td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <IconButton color="neutral" variant="plain" onClick={() => {
                                    setEditDisease(disease)
                                    setEditModalOpen(true)
                                }}>
                                    <EditIcon />
                                </IconButton>
                                <Modal
                                    aria-labelledby="Update disease modal"
                                    aria-describedby="Update disease form"
                                    open={editModalOpen}
                                    onClose={() => setEditModalOpen(false)}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <DiseaseForm
                                        buttonText="Actualizar"
                                        addDisease={updateDisease}
                                        setModalOpen={setEditModalOpen}
                                        oldDisease={editDisease!}
                                    />
                                </Modal>
                                <IconButton color="neutral" variant="plain" onClick={() => deleteDisease(disease)}>
                                    <DeleteIcon />
                                </IconButton>
                            </td>
                            <td style={{ paddingRight: 20, verticalAlign: 'middle', textAlign: 'right' }}>
                                <Link href={`disease/${disease.id}`}>
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