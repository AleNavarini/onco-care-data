'use client';
import { IconButton, Modal, Sheet, Table, Typography } from '@mui/joy';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useState } from 'react';
import Link from 'next/link';
import PatientForm from '../Forms/PatientForm';
import { FullPatient } from '@/types/FullPatient';
import StatusChip from '../StatusChip';
import { mutate } from 'swr';

interface Props {
  patients: FullPatient[];
}

export default function PatientsDashboard({
  patients: initialPatients,
}: Props) {
  const [patients, setPatients] = useState<FullPatient[]>(initialPatients);
  const [editPatient, setEditPatient] = useState<FullPatient | null>(null);
  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const addPatient = (patient: FullPatient) => {
    setPatients((prevPatients) => [...prevPatients, patient]);
    mutate('/api/patients')
  };

  const updatePatient = (patient: FullPatient) => {
    setPatients((prevPatients) =>
      prevPatients.map((p: FullPatient) => {
        if (p.id === patient.id) return { ...patient };
        return p;
      }),
    );
  };

  const deletePatient = async (patient: FullPatient) => {
    let result = confirm('Seguro que quiere borrar el paciente?');
    if (!result) return;
    const response = await fetch(`/api/patients/${patient.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      setPatients((prevPatients) =>
        prevPatients.filter((p: FullPatient) => p.id !== patient.id),
      );
      mutate('/api/patients')
    }
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        width: {
          xs: '100%',
          sm: '95%',
          md: '80%',
          lg: '75%',
        },
        mx: 'auto',
        borderRadius: 'md',
        overflow: 'auto',
        my: 2,
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
              Nombre
            </th>
            <th
              style={{
                width: 100,
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
            >
              Telefono
            </th>
            <th
              style={{
                width: 250,
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
            >
              Mail
            </th>
            <th
              style={{
                width: 100,
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
            >
              Estado
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
                <PatientForm
                  buttonText="Agregar"
                  addPatient={addPatient}
                  setModalOpen={setNewModalOpen}
                />
              </Modal>
            </th>
          </tr>
        </thead>
        <tbody>
          {patients?.map((patient: FullPatient) => (
            <tr key={patient.id.toString()}>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Typography fontWeight="md">{patient.name}</Typography>
              </td>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Typography noWrap fontWeight="md">
                  {patient.phone}
                </Typography>
              </td>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Typography noWrap fontWeight="md">
                  {patient.email}
                </Typography>
              </td>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <StatusChip status={patient.status} />
              </td>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <IconButton
                  color="neutral"
                  variant="plain"
                  onClick={() => {
                    setEditPatient(patient);
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
                  <PatientForm
                    buttonText="Actualizar"
                    addPatient={updatePatient}
                    setModalOpen={setEditModalOpen}
                    oldPatient={editPatient!}
                  />
                </Modal>
                <IconButton
                  color="neutral"
                  variant="plain"
                  onClick={() => deletePatient(patient)}
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
    </Sheet>
  );
}
