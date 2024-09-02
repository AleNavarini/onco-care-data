import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, IconButton, Modal, Typography, Sheet } from '@mui/joy';
import { Complication } from '@prisma/client';
import { useState } from 'react';
import ComplicationForm from '../forms/complication-form';

interface Props {
  treatmentId: string;
  complications?: Complication[];
}

export default function ComplicationsTable({
  treatmentId,
  complications: initialComplications,
}: Props) {
  const [complications, setComplications] = useState<Complication[]>(
    initialComplications ?? [],
  );
  const [editComplication, setEditComplication] = useState<Complication | null>(
    null,
  );
  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const addComplication = (complication: Complication) =>
    setComplications((prevComplications) => [
      ...prevComplications,
      complication,
    ]);

  const updateComplication = (complication: Complication) => {
    setComplications((prevComplications) =>
      prevComplications.map((s: Complication) => {
        if (s.id === complication.id) return complication;
        return s;
      }),
    );
  };

  const deleteComplication = async (complication: Complication) => {
    const response = await fetch(`/api/complications/${complication.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      setComplications((prevComplications) =>
        prevComplications.filter((s: Complication) => s.id !== complication.id),
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
            {complications.length > 0 && (
              <>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Tiempo
                </th>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Tipo
                </th>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Transfusiones
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
                aria-labelledby="New complication modal"
                aria-describedby="New complication form"
                open={newModalOpen}
                onClose={() => setNewModalOpen(false)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ComplicationForm
                  treatmentId={treatmentId}
                  buttonText="Agregar"
                  handler={addComplication}
                  setModalOpen={setNewModalOpen}
                />
              </Modal>
            </th>
          </tr>
        </thead>
        <tbody>
          {complications &&
            complications.length > 0 &&
            complications.map((complication: Complication) => {
              return (
                <tr key={complication?.id.toString()}>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography fontWeight="md">
                      {complication?.time}
                    </Typography>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography noWrap fontWeight="md">
                      {complication?.type}
                    </Typography>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography noWrap fontWeight="md">
                      {complication?.transfusions}
                    </Typography>
                  </td>

                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <IconButton
                      color="neutral"
                      variant="plain"
                      onClick={() => {
                        setEditComplication(complication);
                        setEditModalOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <Modal
                      aria-labelledby="Update complication modal"
                      aria-describedby="Update complication form"
                      open={editModalOpen}
                      onClose={() => setEditModalOpen(false)}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <ComplicationForm
                        treatmentId={treatmentId}
                        buttonText="Actualizar"
                        handler={updateComplication}
                        setModalOpen={setEditModalOpen}
                        oldComplication={editComplication!}
                      />
                    </Modal>
                    <IconButton
                      color="neutral"
                      variant="plain"
                      onClick={() => {
                        const result = confirm(
                          'Quiere borrar la complicacion?',
                        );
                        if (!result) return;
                        deleteComplication(complication);
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
