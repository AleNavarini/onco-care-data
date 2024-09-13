import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/big-int-extensions';

export async function POST(request: Request) {
  const { name, patientId } = await request.json();

  const disease = await prisma.disease.findFirst({
    where: {
      name: name,
    },
    include: {
      riskFactors: {
        where: {
          patientId: null,
        },
      },
    },
  });

  if (!disease) return NextResponse.error();

  const patient = await prisma.patient.update({
    where: {
      id: BigInt(patientId),
    },
    data: {
      disease: {
        connect: {
          id: disease.id,
        },
      },
    },
  });

  const riskFactors = disease.riskFactors;
  await prisma.riskFactor.createMany({
    data: riskFactors.map((riskFactor) => ({
      name: riskFactor.name,
      patientId: BigInt(patientId),
      diseaseId: BigInt(disease.id),
    })),
  });

  return NextResponse.json({
    status: 204,
    patient,
  });
}

export async function PUT(request: Request) {
  const { name, patientId, deleteRiskFactors } = await request.json();

  try {
    const disease = await prisma.disease.findFirst({
      where: {
        name: name,
      },
      include: {
        riskFactors: {
          where: {
            patientId: null,
          },
        },
      },
    });
    if (!disease) return NextResponse.error();

    const patient = await prisma.patient.update({
      where: {
        id: BigInt(patientId),
      },
      data: {
        disease: {
          connect: {
            id: disease.id,
          },
        },
      },
    });

    if (deleteRiskFactors) {
      await prisma.riskFactor.deleteMany({
        where: {
          patientId: BigInt(patientId),
        },
      });

      await prisma.riskFactor.createMany({
        data: disease.riskFactors.map((riskFactor) => ({
          name: riskFactor.name,
          patientId: BigInt(patientId),
          diseaseId: BigInt(disease.id),
        })),
      });
    }
    return NextResponse.json({
      status: 204,
      patient,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
