import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function PUT(request: Request) {
  const data = await request.json();
  const { name, patientId, deleteRiskFactors } = data;

  try {
    const disease = await prisma.disease.update({
      where: {
        patientId: BigInt(patientId),
      },
      data: {
        name: name,
      },
    });

    if (deleteRiskFactors) {
      await prisma.riskFactor.deleteMany({
        where: {
          patientId: BigInt(patientId),
        },
      });

      const riskFactors = await prisma.riskFactor.findMany({
        where: {
          disease: {
            name: name,
          },
        },
      });

      for (const riskFactor of riskFactors) {
        await prisma.riskFactor.create({
          data: {
            name: riskFactor.name,
            patientId: BigInt(patientId),
            diseaseId: BigInt(disease.id),
          },
        });
      }
    }
    return NextResponse.json({
      status: 204,
      disease,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
