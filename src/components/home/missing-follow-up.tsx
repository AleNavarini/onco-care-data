'use client';
import React from 'react';
import { Patient } from '@prisma/client';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import MissingFollowUpAlert from './missing-follow-up-alert';

const MissingFollowUps: React.FC = () => {
  const { data, error } = useSWR<Patient[]>(
    '/api/v1/patients-missing-follow-up',
    fetcher,
  );

  if (error) {
    return <p>Error al cargar pacientes: {error.message}</p>;
  }

  return (
    <div>
      {data && data.length > 0 && (
        <div className="mb-4">
          {data.map((patient: Patient) => (
            <MissingFollowUpAlert
              key={patient.id.toString()}
              patient={patient}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MissingFollowUps;
