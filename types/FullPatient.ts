import { FollowUp } from '@prisma/client';

export type FullPatient = {
  id: bigint;
  dni: string;
  name: string | null;
  dateOfBirth: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  healthInsurance: string | null;
  clinicHistory: bigint | null;
  status: string;
  followUps?: FollowUp[];
};
