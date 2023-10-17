'use client';
import { IconButton, Modal, Sheet, Table, Typography } from '@mui/joy';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useState } from 'react';
import Link from 'next/link';
import { StudyType } from '@prisma/client';
import StudyTypeForm from '../Forms/StudyTypeForm';

interface Props {
  studyTypes: StudyType[];
}

export default function StudyTypesDasboard(props: Props) {
  const [studyTypes, setStudyTypes] = useState<StudyType[]>(props.studyTypes);
  const [editStudyType, setEditStudyType] = useState<StudyType | null>(null);
  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const addStudyType = (studyType: StudyType) =>
    setStudyTypes((prevStudyTypes) => [...prevStudyTypes, studyType]);

  const updateStudyType = (studyType: StudyType) => {
    setStudyTypes((prevStudyTypes) =>
      prevStudyTypes.map((st: StudyType) => {
        if (st.id === studyType.id) return studyType;
        return st;
      }),
    );
  };

  const deleteStudyType = async (studyType: StudyType) => {
    let result = confirm('Seguro que quiere borrar el tipo de estudio?');
    if (!result) return;
    const response = await fetch(`/api/study-types/${studyType.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      setStudyTypes((prevStudyTypes) =>
        prevStudyTypes.filter((d: StudyType) => d.id !== studyType.id),
      );
    }
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: 'md',
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
            <th
              style={{
                width: 100,
                textAlign: 'center',
                paddingLeft: 20,
                verticalAlign: 'middle',
              }}
            >
              Tipo de Estudio
            </th>
            <th
              style={{
                width: 100,
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
            >
              Accion
            </th>
            <th
              style={{
                width: 100,
                paddingRight: 20,
                verticalAlign: 'middle',
                textAlign: 'right',
              }}
            >
              <IconButton
                color="neutral"
                variant="plain"
                onClick={() => setNewModalOpen(true)}
              >
                <AddBoxIcon fontSize="large" />
              </IconButton>

              <Modal
                aria-labelledby="New studyType modal"
                aria-describedby="New studyType form"
                open={newModalOpen}
                onClose={() => setNewModalOpen(false)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <StudyTypeForm
                  buttonText="Agregar"
                  handler={addStudyType}
                  setModalOpen={setNewModalOpen}
                />
              </Modal>
            </th>
          </tr>
        </thead>
        <tbody>
          {studyTypes &&
            studyTypes.length > 0 &&
            studyTypes.map((studyType: StudyType) => (
              <tr key={studyType.id.toString()}>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Typography fontWeight="md">{studyType.name}</Typography>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <IconButton
                    color="neutral"
                    variant="plain"
                    onClick={() => {
                      setEditStudyType(studyType);
                      setEditModalOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <Modal
                    aria-labelledby="Update studyType modal"
                    aria-describedby="Update studyType form"
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <StudyTypeForm
                      buttonText="Actualizar"
                      handler={updateStudyType}
                      setModalOpen={setEditModalOpen}
                      oldStudyType={editStudyType!}
                    />
                  </Modal>
                  <IconButton
                    color="neutral"
                    variant="plain"
                    onClick={() => deleteStudyType(studyType)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
                <td
                  style={{
                    paddingRight: 20,
                    verticalAlign: 'middle',
                    textAlign: 'right',
                  }}
                >
                  <Link href={`studyType/${studyType.id}`}>
                    <IconButton color="neutral" variant="plain">
                      <ArrowCircleRightOutlinedIcon />
                    </IconButton>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
