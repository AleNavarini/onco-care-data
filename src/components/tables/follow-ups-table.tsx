import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, IconButton, Modal, Typography, Sheet } from '@mui/joy';
import { FollowUp } from '@prisma/client';
import { useState } from 'react';
import FollowUpForm from '../forms/follow-up-form';

interface Props {
  patientId: string;
  followUps: FollowUp[];
}

export default function FollowUpsTable({
  patientId,
  followUps: initialFollowUps,
}: Props) {
  const [followUps, setFollowUps] = useState<FollowUp[]>(initialFollowUps);
  const [editFollowUp, setEditFollowUp] = useState<FollowUp | null>(null);
  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const addFollowUp = (followUp: FollowUp) =>
    setFollowUps((prevFollowUps) => [...prevFollowUps, followUp]);

  const updateFollowUp = (followUp: FollowUp) => {
    setFollowUps((prevFollowUps) =>
      prevFollowUps.map((fu: FollowUp) => {
        if (fu.id === followUp.id) return followUp;
        return fu;
      }),
    );
  };

  const deleteFollowUp = async (followUp: FollowUp) => {
    const response = await fetch(`/api/follow-ups/${followUp.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      setFollowUps((prevFollowUps) =>
        prevFollowUps.filter((fu: FollowUp) => fu.id !== followUp.id),
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
            {followUps.length > 0 && (
              <>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Fecha
                </th>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Vino
                </th>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Tiene Enfermedad
                </th>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Sitio Recidiva
                </th>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Murio
                </th>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Causa Muerte
                </th>
                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  Observaciones
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
                <FollowUpForm
                  patientId={patientId}
                  handler={addFollowUp}
                  setModalOpen={setNewModalOpen}
                />
              </Modal>
            </th>
          </tr>
        </thead>
        <tbody>
          {followUps &&
            followUps.length > 0 &&
            followUps.map((followUp: FollowUp) => {
              const date = followUp.date.toString().split('T')[0];
              function getStringForBoolean(bool: boolean | null) {
                if (bool === null) return '';
                return bool ? 'Si' : 'No';
              }
              return (
                <tr key={followUp.id.toString()}>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography fontWeight="md">{date}</Typography>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography fontWeight="md">
                      {getStringForBoolean(followUp.attended)}
                    </Typography>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography fontWeight="md">
                      {getStringForBoolean(followUp.hasDisease)}
                    </Typography>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography fontWeight="md">
                      {followUp.recurrenceSite}
                    </Typography>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography fontWeight="md">
                      {getStringForBoolean(followUp.died)}
                    </Typography>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography fontWeight="md">
                      {followUp.causeOfDeath}
                    </Typography>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography fontWeight="md">
                      {followUp.observations}
                    </Typography>
                  </td>

                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <IconButton
                      color="neutral"
                      variant="plain"
                      onClick={() => {
                        setEditFollowUp(followUp);
                        setEditModalOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <Modal
                      aria-labelledby="Update followUp modal"
                      aria-describedby="Update followUp form"
                      open={editModalOpen}
                      onClose={() => setEditModalOpen(false)}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <FollowUpForm
                        patientId={patientId}
                        handler={updateFollowUp}
                        setModalOpen={setEditModalOpen}
                        oldFollowUp={editFollowUp!}
                      />
                    </Modal>
                    <IconButton
                      color="neutral"
                      variant="plain"
                      onClick={() => {
                        const result = confirm('Quiere borrar el seguimiento?');
                        if (!result) return;
                        deleteFollowUp(followUp);
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
