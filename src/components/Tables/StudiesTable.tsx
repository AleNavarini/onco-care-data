import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, IconButton, Modal, Typography, Sheet } from '@mui/joy';
import { Study } from '@prisma/client';
import { useState } from 'react';
import StudyForm from '../Forms/StudyForm';

interface Props {
  patientId: string;
  studies: Study[];
}

export default function StudiesTable({
  patientId,
  studies: initialStudies,
}: Props) {
  const [studies, setStudies] = useState<Study[]>(initialStudies);
  const [editStudy, setEditStudy] = useState<Study | null>(null);
  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const addStudy = (study: Study) =>
    setStudies((prevStudies) => [...prevStudies, study]);

  const updateStudy = (study: Study) => {
    setEditStudy(study);
    setStudies((prevStudies) =>
      prevStudies.map((st: Study) => {
        if (st.id === study.id) return study;
        return st;
      }),
    );
  };

  const deleteStudy = async (study: Study) => {
    const response = await fetch(`/api/studies/${study.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      setStudies((prevStudies) =>
        prevStudies.filter((fu: Study) => fu.id !== study.id),
      );
    }
  };
  return (
    <Sheet
      sx={{
        width: '100%',
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
            {studies.length > 0 && (
              <>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Fecha
                </th>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Tipo
                </th>
              </>
            )}
            <th
              style={{
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
                aria-labelledby="New follow up modal"
                aria-describedby="New follow up form"
                open={newModalOpen}
                onClose={() => setNewModalOpen(false)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <StudyForm
                  patientId={patientId}
                  setModalOpen={setNewModalOpen}
                  handler={addStudy}
                />
              </Modal>
            </th>
          </tr>
        </thead>
        <tbody>
          {studies &&
            studies.length > 0 &&
            studies.map((study: any) => {
              const date = study.date.toString().split('T')[0];

              return (
                <tr key={study.id.toString()}>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography fontWeight="md">{date}</Typography>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography fontWeight="md">
                      {study.studyType?.name}
                    </Typography>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <IconButton
                      color="neutral"
                      variant="plain"
                      onClick={() => {
                        setEditStudy(study);
                        setEditModalOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <Modal
                      aria-labelledby="Update study modal"
                      aria-describedby="Update study form"
                      open={editModalOpen}
                      onClose={() => setEditModalOpen(false)}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <StudyForm
                        oldStudy={editStudy!}
                        patientId={patientId}
                        setModalOpen={setNewModalOpen}
                        handler={updateStudy}
                      />
                    </Modal>
                    <IconButton
                      color="neutral"
                      variant="plain"
                      onClick={() => {
                        const result = confirm('Quiere borrar el seguimiento?');
                        if (!result) return;
                        deleteStudy(study);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Sheet>
  );
}
