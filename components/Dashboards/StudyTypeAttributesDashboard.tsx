"use client"
import { IconButton, Modal, Sheet, Table, Typography } from "@mui/joy";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { StudyTypeAttribute } from "@prisma/client";
import StudyTypeAttributeForm from "../Forms/StudyTypeAttributeForm";

interface Props {
    studyTypeAttributes: StudyTypeAttribute[]
    forPatient: boolean
    studyTypeId?: string
}

export default function StudyTypeAttributesDashboard(props: Props) {
    const [studyTypeAttributes, setStudyTypeAttributes] = useState<StudyTypeAttribute[]>(props.studyTypeAttributes)
    const [editStudyTypeAttribute, setEditStudyTypeAttribute] = useState<StudyTypeAttribute | null>(null)
    const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    const addStudyTypeAttribute = (studyTypeAttribute: StudyTypeAttribute) => setStudyTypeAttributes((prevStudyTypeAttributes) => [...prevStudyTypeAttributes, studyTypeAttribute])

    const updateStudyTypeAttribute = (studyTypeAttribute: StudyTypeAttribute) => {
        setStudyTypeAttributes((prevStudyTypeAttributes) => prevStudyTypeAttributes.map((rf: StudyTypeAttribute) => {
            if (rf.id === studyTypeAttribute.id) return studyTypeAttribute
            return rf
        }))
    }

    const deleteStudyTypeAttribute = async (studyTypeAttribute: StudyTypeAttribute) => {
        let result = confirm("Seguro que quiere borrar el atributo?")
        if (!result) return
        const response = await fetch(`/api/study-types-attributes/${studyTypeAttribute.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            setStudyTypeAttributes((prevStudyTypeAttributes) => prevStudyTypeAttributes.filter((rf: StudyTypeAttribute) => rf.id !== studyTypeAttribute.id))
        }
    }

    return (
        <Sheet
            sx={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
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
                        {
                            props.forPatient &&
                            <th style={{ width: 100, textAlign: 'center', paddingLeft: 20, verticalAlign: 'middle' }}>Valor</th>
                        }
                        <th style={{ width: 100, textAlign: 'center', verticalAlign: 'middle' }}>Accion</th>
                        <th style={{ width: 100, paddingRight: 20, verticalAlign: 'middle', textAlign: 'right' }}>
                            <IconButton color="neutral" variant="plain" onClick={() => setNewModalOpen(true)}>
                                <AddBoxIcon fontSize="large" />
                            </IconButton>

                            <Modal
                                aria-labelledby="New risk factor modal"
                                aria-describedby="New risk factor form"
                                open={newModalOpen}
                                onClose={() => setNewModalOpen(false)}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <StudyTypeAttributeForm
                                    studyTypeId={props.studyTypeId!}
                                    buttonText="Agregar"
                                    handler={addStudyTypeAttribute}
                                    setModalOpen={setNewModalOpen}
                                />
                            </Modal >

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {studyTypeAttributes && studyTypeAttributes.length > 0 && studyTypeAttributes.map((studyTypeAttribute: StudyTypeAttribute) => (
                        <tr key={studyTypeAttribute?.id.toString()}>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <Typography fontWeight="md">{studyTypeAttribute?.name}</Typography>
                            </td>
                            {
                                props.forPatient &&
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <Typography fontWeight="md">{studyTypeAttribute?.value}</Typography>
                                </td>
                            }
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <IconButton color="neutral" variant="plain" onClick={() => {
                                    setEditStudyTypeAttribute(studyTypeAttribute)
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
                                    <StudyTypeAttributeForm
                                        studyTypeId={props.studyTypeId!}
                                        buttonText="Actualizar"
                                        handler={updateStudyTypeAttribute}
                                        setModalOpen={setEditModalOpen}
                                        oldStudyTypeAttribute={editStudyTypeAttribute!}
                                    />
                                </Modal>
                                <IconButton color="neutral" variant="plain" onClick={() => deleteStudyTypeAttribute(studyTypeAttribute)}>
                                    <DeleteIcon />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet >
    )
}