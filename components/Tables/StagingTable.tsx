import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, IconButton, Modal, Typography, Sheet } from '@mui/joy';
import { Staging } from '@prisma/client';
import { useState } from 'react';
import StagingForm from '../Forms/StagingForm';

interface Props {
  patientId: string;
  stagings: Staging[];
}

export default function StagingTable({
  patientId,
  stagings: initialStagings,
}: Props) {
  const [stagings, setStagings] = useState<Staging[]>(initialStagings);
  const [editStaging, setEditStaging] = useState<Staging | null>(null);
  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const addStaging = (staging: Staging) =>
    setStagings((prevStagings) => [...prevStagings, staging]);

  const updateStaging = (staging: Staging) => {
    setStagings((prevStagings) =>
      prevStagings.map((s: Staging) => {
        if (s.id === staging.id) return staging;
        return s;
      }),
    );
  };

  const deleteStaging = async (staging: Staging) => {
    const response = await fetch(`/api/stagings/${staging.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      setStagings((prevStagings) =>
        prevStagings.filter((s: Staging) => s.id !== staging.id),
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
            {stagings.length > 0 && (
              <>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Fecha
                </th>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Tipo
                </th>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Figo
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
                <StagingForm
                  patientId={patientId}
                  buttonText="Agregar"
                  handler={addStaging}
                  setModalOpen={setNewModalOpen}
                />
              </Modal>
            </th>
          </tr>
        </thead>
        <tbody>
          {stagings &&
            stagings.length > 0 &&
            stagings.map((staging: Staging) => {
              const date = staging.date.toString().split('T')[0];

              return (
                <tr key={staging.id.toString()}>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography fontWeight="md">{date}</Typography>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography noWrap fontWeight="md">
                      {staging.type}
                    </Typography>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography noWrap fontWeight="md">
                      {staging.figo}
                    </Typography>
                  </td>

                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <IconButton
                      color="neutral"
                      variant="plain"
                      onClick={() => {
                        setEditStaging(staging);
                        setEditModalOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <Modal
                      aria-labelledby="Update staging modal"
                      aria-describedby="Update staging form"
                      open={editModalOpen}
                      onClose={() => setEditModalOpen(false)}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <StagingForm
                        patientId={patientId}
                        buttonText="Actualizar"
                        handler={updateStaging}
                        setModalOpen={setEditModalOpen}
                        oldStaging={editStaging!}
                      />
                    </Modal>
                    <IconButton
                      color="neutral"
                      variant="plain"
                      onClick={() => {
                        const result = confirm('Quiere borrar la estadificacion?');
                        if (!result) return;
                        deleteStaging(staging);
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
