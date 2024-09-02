'use client';
import { IconButton, Modal, Typography } from '@mui/joy';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { TreatmentTypeAttribute } from '@prisma/client';
import TreatmentTypeAttributeForm from '../forms/treatment-type-attribute-form';
import DashboardWrapper from '../common/dashboard-wrapper';

interface Props {
  treatmentTypeAttributes: TreatmentTypeAttribute[];
  forPatient: boolean;
  treatmentTypeId?: string;
}

export default function TreatmentTypeAttributesDashboard(props: Props) {
  const [treatmentTypeAttributes, setTreatmentTypeAttributes] = useState<
    TreatmentTypeAttribute[]
  >(props.treatmentTypeAttributes);
  const [editTreatmentTypeAttribute, setEditTreatmentTypeAttribute] =
    useState<TreatmentTypeAttribute | null>(null);
  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const addTreatmentTypeAttribute = (
    treatmentTypeAttribute: TreatmentTypeAttribute,
  ) =>
    setTreatmentTypeAttributes((prevTreatmentTypeAttributes) => [
      ...prevTreatmentTypeAttributes,
      treatmentTypeAttribute,
    ]);

  const updateTreatmentTypeAttribute = (
    treatmentTypeAttribute: TreatmentTypeAttribute,
  ) => {
    setTreatmentTypeAttributes((prevTreatmentTypeAttributes) =>
      prevTreatmentTypeAttributes.map((tta: TreatmentTypeAttribute) => {
        if (tta.id === treatmentTypeAttribute.id) return treatmentTypeAttribute;
        return tta;
      }),
    );
  };

  const deleteTreatmentTypeAttribute = async (
    treatmentTypeAttribute: TreatmentTypeAttribute,
  ) => {
    let result = confirm('Seguro que quiere borrar el atributo?');
    if (!result) return;
    const response = await fetch(
      `/api/treatment-types-attributes/${treatmentTypeAttribute.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 200) {
      setTreatmentTypeAttributes((prevTreatmentTypeAttributes) =>
        prevTreatmentTypeAttributes.filter(
          (rf: TreatmentTypeAttribute) => rf.id !== treatmentTypeAttribute.id,
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
              aria-labelledby="New treatment type attributes modal"
              aria-describedby="New treatment type attributes form"
              open={newModalOpen}
              onClose={() => setNewModalOpen(false)}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TreatmentTypeAttributeForm
                treatmentTypeId={props.treatmentTypeId!}
                buttonText="Agregar"
                handler={addTreatmentTypeAttribute}
                setModalOpen={setNewModalOpen}
              />
            </Modal>
          </th>
        </tr>
      </thead>
      <tbody>
        {treatmentTypeAttributes &&
          treatmentTypeAttributes.length > 0 &&
          treatmentTypeAttributes.map(
            (treatmentTypeAttribute: TreatmentTypeAttribute) => (
              <tr key={treatmentTypeAttribute?.id.toString()}>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Typography fontWeight="md">
                    {treatmentTypeAttribute?.name}
                  </Typography>
                </td>
                {props.forPatient && (
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography fontWeight="md">
                      {treatmentTypeAttribute?.value}
                    </Typography>
                  </td>
                )}
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <IconButton
                    color="neutral"
                    variant="plain"
                    onClick={() => {
                      setEditTreatmentTypeAttribute(treatmentTypeAttribute);
                      setEditModalOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <Modal
                    aria-labelledby="Update treatment type attribute modal"
                    aria-describedby="Update treatment type attribute form"
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <TreatmentTypeAttributeForm
                      treatmentTypeId={props.treatmentTypeId!}
                      buttonText="Actualizar"
                      handler={updateTreatmentTypeAttribute}
                      setModalOpen={setEditModalOpen}
                      oldTreatmentTypeAttribute={editTreatmentTypeAttribute!}
                    />
                  </Modal>
                  <IconButton
                    color="neutral"
                    variant="plain"
                    onClick={() =>
                      deleteTreatmentTypeAttribute(treatmentTypeAttribute)
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
