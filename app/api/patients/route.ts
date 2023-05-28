import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '../../../lib/bigIntExtensions';

export async function GET() {
  const patients = await prisma.patient.findMany({});
  return NextResponse.json({ status: 200, patients });
}

export async function POST(request: Request) {
  const {
    dni,
    name,
    dateOfBirth,
    phone,
    email,
    address,
    healthInsurance,
    clinicHistory,
  } = await request.json();
  try {
    const newPatient = await prisma.patient.create({
      data: {
        dni,
        name,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        phone: phone || null,
        email: email || null,
        address: address || null,
        healthInsurance: healthInsurance || null,
        clinicHistory: clinicHistory ? BigInt(clinicHistory) : null,
      },
    });
    return NextResponse.json({
      status: 201,
      message: 'Patient created',
      patient: newPatient,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.error();
  }
}
