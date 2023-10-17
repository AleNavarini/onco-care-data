'use client';
import { IconButton, Modal, Sheet, Table, Typography } from '@mui/joy';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useState } from 'react';
import Link from 'next/link';
import { TreatmentType } from '@prisma/client';
import TreatmentTypeForm from '../Forms/TreatmentTypeForm';

interface Props {
  treatmentTypes: TreatmentType[];
}

export default function TreatmentTypesDasboard(props: Props) {
  const [treatmentTypes, setTreatmentTypes] = useState<TreatmentType[]>(
    props.treatmentTypes,
  );
  const [editTreatmentType, setEditTreatmentType] =
    useState<TreatmentType | null>(null);
  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const addTreatmentType = (treatmentType: TreatmentType) =>
    setTreatmentTypes((prevTreatmentTypes) => [
      ...prevTreatmentTypes,
      treatmentType,
    ]);

  const updateTreatmentType = (treatmentType: TreatmentType) => {
    setTreatmentTypes((prevTreatmentTypes) =>
      prevTreatmentTypes.map((tt: TreatmentType) => {
        if (tt.id === treatmentType.id) return treatmentType;
        return tt;
      }),
    );
  };

  const deleteTreatmentType = async (treatmentType: TreatmentType) => {
    let result = confirm('Seguro que quiere borrar el tipo de tratamiento?');
    if (!result) return;
    const response = await fetch(`/api/treatment-types/${treatmentType.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      setTreatmentTypes((prevTreatmentTypes) =>
        prevTreatmentTypes.filter(
          (tt: TreatmentType) => tt.id !== treatmentType.id,
        ),
      );
    }
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: 'md',
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
              Tipo de Tratamiento
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
                aria-labelledby="New treatmentType modal"
                aria-describedby="New treatmentType form"
                open={newModalOpen}
                onClose={() => setNewModalOpen(false)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TreatmentTypeForm
                  buttonText="Agregar"
                  handler={addTreatmentType}
                  setModalOpen={setNewModalOpen}
                />
              </Modal>
            </th>
          </tr>
        </thead>
        <tbody>
          {treatmentTypes &&
            treatmentTypes.length > 0 &&
            treatmentTypes.map((treatmentType: TreatmentType) => (
              <tr key={treatmentType.id.toString()}>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Typography fontWeight="md">{treatmentType?.name}</Typography>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <IconButton
                    color="neutral"
                    variant="plain"
                    onClick={() => {
                      setEditTreatmentType(treatmentType);
                      setEditModalOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <Modal
                    aria-labelledby="Update treatmentType modal"
                    aria-describedby="Update treatmentType form"
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <TreatmentTypeForm
                      buttonText="Actualizar"
                      handler={updateTreatmentType}
                      setModalOpen={setEditModalOpen}
                      oldTreatmentType={editTreatmentType!}
                    />
                  </Modal>
                  <IconButton
                    color="neutral"
                    variant="plain"
                    onClick={() => deleteTreatmentType(treatmentType)}
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
                  <Link href={`treatmentType/${treatmentType.id}`}>
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
