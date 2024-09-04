import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import '@/lib/big-int-extensions';
import { mapStatus } from '@/utils';

export async function GET(request: NextRequest, context: { params: any }) {
  const id = context.params.id;
  let params = request.nextUrl.toString().split('?')[1];

  try {
    let patient;
    if (params.indexOf('detailed=true') < 0) {
      patient = await prisma.patient.findUnique({
        where: {
          id: BigInt(id),
        },
      });
    } else {
      patient = await prisma.patient.findUnique({
        where: {
          id: BigInt(id),
        },
        include: {
          affiliatoryData: true,
          gestations: true,
          symptoms: true,
          previousSurgeries: true,
          disease: true,
          riskFactors: true,
          stagings: true,
          followUps: true,
          studies: {
            include: {
              studyType: true,
              studyTypeAttributes: true,
            },
          },
          treatments: {
            include: {
              treatmentType: true,
              treatmentTypeAttributes: true,
              treatmentTypeResults: true,
              complications: true,
            },
          },
        },
      });
    }

    if (!patient)
      return NextResponse.json({
        status: 404,
        message: 'Patient not found',
      });

    return NextResponse.json({
      status: 200,
      patient,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;

  try {
    const result = await prisma.patient.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({ status: 200, deletedPatient: result });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function PUT(request: Request, context: { params: any }) {
  const id = context.params.id;
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
  const mappedStatus = mapStatus(status);
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
        status: mappedStatus,
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
