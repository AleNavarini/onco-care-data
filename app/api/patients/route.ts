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
        dni: dni,
        name: name,
        dateOfBirth: new Date(dateOfBirth),
        phone: phone,
        email: email,
        address: address,
        healthInsurance: healthInsurance,
        clinicHistory: clinicHistory,
      },
    });
    return NextResponse.json({
      status: 201,
      message: 'Patient created',
      patiend: newPatient,
    });
  } catch (error) {
    return NextResponse.error();
  }
}
