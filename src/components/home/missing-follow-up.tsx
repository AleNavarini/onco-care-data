// components/MissingFollowUps.tsx

'use client';

import React from 'react';
import { Typography, Box } from '@mui/joy';
import { Patient } from '@prisma/client';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import MissingFollowUpAlert from './missing-follow-up-alert';

const MissingFollowUps: React.FC = () => {
    const { data, error, isLoading } = useSWR<Patient[]>(
        '/api/patients-missing-follow-up',
        fetcher,
    );

    if (isLoading) {
        return (
            <Typography>Cargando pacientes con seguimiento pendiente...</Typography>
        );
    }

    if (error) {
        return (
            <Typography color="danger">
                Error al cargar pacientes: {error.message}
            </Typography>
        );
    }

    return (
        <Box>
            {data && data.length > 0 ? (
                <Box sx={{ mb: 4 }}>
                    {data.map((patient: Patient) => (
                        <MissingFollowUpAlert
                            key={patient.id.toString()}
                            patient={patient}
                        />
                    ))}
                </Box>
            ) : (
                <Typography>No hay pacientes con seguimiento pendiente.</Typography>
            )}
        </Box>
    );
};

export default MissingFollowUps;
