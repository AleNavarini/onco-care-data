
import "../../../lib/bigIntExtensions"
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
  try {
    const diseases = await prisma.disease.findMany({});

    return NextResponse.json({
      status: 200,
      diseases,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error;
  }
}

export async function POST(request: Request) {
  const { name, patientId } = await request.json();
  try {
    const disease = await prisma.disease.create({
      data: {
        name: name,
        patientId: patientId ? BigInt(patientId) : null,
      },
    });

    if (patientId) {
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
      status: 201,
      disease,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
