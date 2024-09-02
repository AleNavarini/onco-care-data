'use client';
import { IconButton, Modal, Typography } from '@mui/joy';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { TreatmentTypeResult } from '@prisma/client';
import TreatmentTypeResultForm from '../forms/treatment-type-result-form';
import DashboardWrapper from '../common/dashboard-wrapper';

interface Props {
  treatmentTypeResults: TreatmentTypeResult[];
  forPatient: boolean;
  treatmentTypeId?: string;
}

export default function TreatmentTypeResultsDashboard(props: Props) {
  const [treatmentTypeResults, setTreatmentTypeResults] = useState<
    TreatmentTypeResult[]
  >(props.treatmentTypeResults);
  const [editTreatmentTypeResult, setEditTreatmentTypeResult] =
    useState<TreatmentTypeResult | null>(null);
  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const addTreatmentTypeResult = (treatmentTypeResult: TreatmentTypeResult) =>
    setTreatmentTypeResults((prevTreatmentTypeResults) => [
      ...prevTreatmentTypeResults,
      treatmentTypeResult,
    ]);

  const updateTreatmentTypeResult = (
    treatmentTypeResult: TreatmentTypeResult,
  ) => {
    setTreatmentTypeResults((prevTreatmentTypeResults) =>
      prevTreatmentTypeResults.map((tta: TreatmentTypeResult) => {
        if (tta.id === treatmentTypeResult.id) return treatmentTypeResult;
        return tta;
      }),
    );
  };

  const deleteTreatmentTypeResult = async (
    treatmentTypeResult: TreatmentTypeResult,
  ) => {
    let result = confirm('Seguro que quiere borrar el resultado?');
    if (!result) return;
    const response = await fetch(
      `/api/treatment-types-results/${treatmentTypeResult.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 200) {
      setTreatmentTypeResults((prevTreatmentTypeResults) =>
        prevTreatmentTypeResults.filter(
          (rf: TreatmentTypeResult) => rf.id !== treatmentTypeResult.id,
        ),
      );
    }
  };

  return (
    <DashboardWrapper>
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
          {props.forPatient && (
            <th
              style={{
                width: 100,
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
              aria-labelledby="New treatment type result modal"
              aria-describedby="New treatment type result form"
              open={newModalOpen}
              onClose={() => setNewModalOpen(false)}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TreatmentTypeResultForm
                treatmentTypeId={props.treatmentTypeId!}
                buttonText="Agregar"
                handler={addTreatmentTypeResult}
                setModalOpen={setNewModalOpen}
              />
            </Modal>
          </th>
        </tr>
      </thead>
      <tbody>
        {treatmentTypeResults &&
          treatmentTypeResults.length > 0 &&
          treatmentTypeResults.map(
            (treatmentTypeResult: TreatmentTypeResult) => (
              <tr key={treatmentTypeResult?.id.toString()}>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Typography fontWeight="md">
                    {treatmentTypeResult?.name}
                  </Typography>
                </td>
                {props.forPatient && (
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography fontWeight="md">
                      {treatmentTypeResult?.value}
                    </Typography>
                  </td>
                )}
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <IconButton
                    color="neutral"
                    variant="plain"
                    onClick={() => {
                      setEditTreatmentTypeResult(treatmentTypeResult);
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
                    <TreatmentTypeResultForm
                      treatmentTypeId={props.treatmentTypeId!}
                      buttonText="Actualizar"
                      handler={updateTreatmentTypeResult}
                      setModalOpen={setEditModalOpen}
                      oldTreatmentTypeResult={editTreatmentTypeResult!}
                    />
                  </Modal>
                  <IconButton
                    color="neutral"
                    variant="plain"
                    onClick={() =>
                      deleteTreatmentTypeResult(treatmentTypeResult)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ),
          )}
      </tbody>
    </DashboardWrapper>
  );
}
