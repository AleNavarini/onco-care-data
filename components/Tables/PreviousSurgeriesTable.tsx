import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, IconButton, Modal, Typography, Sheet } from '@mui/joy';
import { PreviousSurgery } from '@prisma/client';
import { useState } from 'react';
import SymptomForm from '../Forms/SymptomForm';
import PreviousSurgeryForm from '../Forms/PreviousSurgeryForm';

interface Props {
  patientId: string;
  previousSurgeries: PreviousSurgery[];
}

export default function PreviousSurgeriesTable({
  patientId,
  previousSurgeries: initialPreviousSurgeries,
}: Props) {
  const [previousSurgeries, setPreviousSurgeries] = useState<PreviousSurgery[]>(
    initialPreviousSurgeries,
  );
  const [editPreviousSurgery, setEditPreviousSurgery] =
    useState<PreviousSurgery | null>(null);
  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const addPreviousSurgery = (previousSurgery: PreviousSurgery) =>
    setPreviousSurgeries((prevSurgeries) => [
      ...prevSurgeries,
      previousSurgery,
    ]);

  const updatePreviousSurgery = (previousSurgery: PreviousSurgery) => {
    setPreviousSurgeries((prevSurgeries) =>
      prevSurgeries.map((ps: PreviousSurgery) => {
        if (ps.id === previousSurgery.id) return previousSurgery;
        return ps;
      }),
    );
  };

  const deletePreviousSurgery = async (previousSurgery: PreviousSurgery) => {
    const response = await fetch(
      `/api/previous-surgeries/${previousSurgery.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 200) {
      setPreviousSurgeries((prevSurgeries) =>
        prevSurgeries.filter(
          (ps: PreviousSurgery) => ps.id !== previousSurgery.id,
        ),
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
            {previousSurgeries && previousSurgeries.length > 0 && (
              <>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Tipo
                </th>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Observaciones
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
                <PreviousSurgeryForm
                  patientId={patientId}
                  buttonText="Agregar"
                  addPreviousSurgery={addPreviousSurgery}
                  setModalOpen={setNewModalOpen}
                />
              </Modal>
            </th>
          </tr>
        </thead>
        <tbody>
          {previousSurgeries &&
            previousSurgeries.length > 0 &&
            previousSurgeries.map((previousSurgery: PreviousSurgery) => (
              <tr key={previousSurgery?.id.toString()}>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Typography fontWeight="md">
                    {previousSurgery?.surgeryType}
                  </Typography>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Typography noWrap fontWeight="md">
                    {previousSurgery?.observations}
                  </Typography>
                </td>

                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <IconButton
                    color="neutral"
                    variant="plain"
                    onClick={() => {
                      setEditPreviousSurgery(previousSurgery);
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
                    <PreviousSurgeryForm
                      patientId={patientId}
                      buttonText="Actualizar"
                      addPreviousSurgery={updatePreviousSurgery}
                      setModalOpen={setEditModalOpen}
                      oldPreviousSurgery={editPreviousSurgery!}
                    />
                  </Modal>
                  <IconButton
                    color="neutral"
                    variant="plain"
                    onClick={() => {
                      var result = confirm(
                        'Seguro que queres borrar la cirugia?',
                      );
                      if (!result) return;
                      deletePreviousSurgery(previousSurgery);
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
