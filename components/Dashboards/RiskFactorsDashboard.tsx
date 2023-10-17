'use client';
import { IconButton, Modal, Sheet, Table, Typography } from '@mui/joy';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useState } from 'react';
import Link from 'next/link';
import { RiskFactor } from '@prisma/client';
import DiseaseForm from '../Forms/DiseaseForm';
import RiskFactorForm from '../Forms/RiskFactorForm';

interface Props {
  riskFactors: RiskFactor[];
  forPatient: boolean;
  diseaseId: string;
  patientId?: string;
}

export default function RiskFactorsDashboard(props: Props) {
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>(
    props.riskFactors,
  );
  const [editRiskFactor, setEditRiskFactor] = useState<RiskFactor | null>(null);
  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const addRiskFactor = (riskFactor: RiskFactor) =>
    setRiskFactors((prevRiskFactors) => [...prevRiskFactors, riskFactor]);

  const updateRiskFactor = (riskFactor: RiskFactor) => {
    setRiskFactors((prevRiskFactors) =>
      prevRiskFactors.map((rf: RiskFactor) => {
        if (rf.id === riskFactor.id) return riskFactor;
        return rf;
      }),
    );
  };

  const deleteRiskFactor = async (riskFactor: RiskFactor) => {
    let result = confirm('Seguro que quiere borrar el factor de riesgo?');
    if (!result) return;
    const response = await fetch(`/api/risk-factors/${riskFactor.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      setRiskFactors((prevRiskFactors) =>
        prevRiskFactors.filter((rf: RiskFactor) => rf.id !== riskFactor.id),
      );
    }
  };

  return (
    <Sheet
      sx={{
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
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
            <th
              style={{
                width: 80,
                textAlign: 'center',
                paddingLeft: 20,
                verticalAlign: 'middle',
              }}
            >
              Nombre
            </th>
            {props.forPatient && (
              <th
                style={{
                  width: 80,
                  textAlign: 'center',
                  paddingLeft: 20,
                  verticalAlign: 'middle',
                }}
              >
                Valor
              </th>
            )}
            <th
              style={{
                width: 80,
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
            >
              Accion
            </th>
            <th
              style={{
                width: 80,
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
                aria-labelledby="New risk factor modal"
                aria-describedby="New risk factor form"
                open={newModalOpen}
                onClose={() => setNewModalOpen(false)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <RiskFactorForm
                  diseaseId={!props.forPatient ? props.diseaseId : undefined}
                  patientId={props.forPatient ? props.patientId : undefined}
                  buttonText="Agregar"
                  handler={addRiskFactor}
                  setModalOpen={setNewModalOpen}
                />
              </Modal>
            </th>
          </tr>
        </thead>
        <tbody>
          {riskFactors &&
            riskFactors.length > 0 &&
            riskFactors.map((riskFactor: RiskFactor) => (
              <tr key={riskFactor?.id.toString()}>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Typography fontWeight="md">{riskFactor?.name}</Typography>
                </td>
                {props.forPatient && (
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography fontWeight="md">{riskFactor?.value}</Typography>
                  </td>
                )}
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <IconButton
                    color="neutral"
                    variant="plain"
                    onClick={() => {
                      setEditRiskFactor(riskFactor);
                      setEditModalOpen(true);
                    }}
                  >
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
                      alignItems: 'center',
                    }}
                  >
                    <RiskFactorForm
                      diseaseId={
                        !props.forPatient ? props.diseaseId : undefined
                      }
                      patientId={props.forPatient ? props.patientId : undefined}
                      buttonText="Actualizar"
                      handler={updateRiskFactor}
                      setModalOpen={setEditModalOpen}
                      oldRiskFactor={editRiskFactor!}
                    />
                  </Modal>
                  <IconButton
                    color="neutral"
                    variant="plain"
                    onClick={() => deleteRiskFactor(riskFactor)}
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
