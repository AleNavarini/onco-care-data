import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import '../../../lib/bigIntExtensions';

export async function GET(request: NextRequest, context: { params: any }) {
  let params = request.nextUrl.toString().split('?')[1];
  let patients;
  if (params.indexOf('detailed=true') >= 0) {
    patients = await prisma.patient.findMany({
      include: {
        followUps: true,
      },
    });
  } else {
    patients = await prisma.patient.findMany({});
  }

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
    status,
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
        status: status,
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
export async function PUT(request: Request) {
  const {
    id,
    dni,
    name,
    dateOfBirth,
    phone,
    email,
    address,
    healthInsurance,
    clinicHistory,
    status,
  } = await request.json();
  try {
    const newPatient = await prisma.patient.update({
      where: {
        id: BigInt(id),
      },
      data: {
        dni,
        name,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        phone: phone || null,
        email: email || null,
        address: address || null,
        healthInsurance: healthInsurance || null,
        clinicHistory: clinicHistory ? BigInt(clinicHistory) : null,
        status: status,
      },
    });
    return NextResponse.json({
      status: 204,
      message: 'Patient updated',
      patient: newPatient,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.error();
  }
}
