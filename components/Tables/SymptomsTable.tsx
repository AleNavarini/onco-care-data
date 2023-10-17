import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, IconButton, Modal, Typography, Sheet } from '@mui/joy';
import { Symptom } from '@prisma/client';
import { useState } from 'react';
import SymptomForm from '../Forms/SymptomForm';

interface Props {
  patientId: string;
  symptoms: Symptom[];
}

export default function SymptomsTable({
  patientId,
  symptoms: initialSymptoms,
}: Props) {
  const [symptoms, setSymptoms] = useState<Symptom[]>(initialSymptoms);
  const [editSymptom, setEditSymptom] = useState<Symptom | null>(null);
  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const addSymptom = (symptom: Symptom) =>
    setSymptoms((prevSymptoms) => [...prevSymptoms, symptom]);

  const updateSymptom = (symptom: Symptom) => {
    setSymptoms((prevSymptoms) =>
      prevSymptoms.map((s: Symptom) => {
        if (s.id === symptom.id) return symptom;
        return s;
      }),
    );
  };

  const deleteSymptom = async (symptom: Symptom) => {
    const response = await fetch(`/api/symptoms/${symptom.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      setSymptoms((prevSymptoms) =>
        prevSymptoms.filter((s: Symptom) => s.id !== symptom.id),
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
            {symptoms.length > 0 && (
              <>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Nombre
                </th>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Valor
                </th>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Accion
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
                aria-labelledby="New patient modal"
                aria-describedby="New patient form"
                open={newModalOpen}
                onClose={() => setNewModalOpen(false)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SymptomForm
                  patientId={patientId}
                  buttonText="Agregar"
                  addSymptom={addSymptom}
                  setModalOpen={setNewModalOpen}
                />
              </Modal>
            </th>
          </tr>
        </thead>
        <tbody>
          {symptoms &&
            symptoms.length > 0 &&
            symptoms.map((symptom: Symptom) => (
              <tr key={symptom?.id.toString()}>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Typography fontWeight="md">{symptom?.name}</Typography>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Typography noWrap fontWeight="md">
                    {symptom?.value}
                  </Typography>
                </td>

                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <IconButton
                    color="neutral"
                    variant="plain"
                    onClick={() => {
                      setEditSymptom(symptom);
                      setEditModalOpen(true);
                    }}
                  >
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
                      alignItems: 'center',
                    }}
                  >
                    <SymptomForm
                      patientId={patientId}
                      buttonText="Actualizar"
                      addSymptom={updateSymptom}
                      setModalOpen={setEditModalOpen}
                      oldSymptom={editSymptom!}
                    />
                  </Modal>
                  <IconButton
                    color="neutral"
                    variant="plain"
                    onClick={() => {
                      var result = confirm(
                        'Seguro que queres borrar el sintoma?',
                      );
                      if (!result) return;
                      deleteSymptom(symptom);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
