import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request, context: { params: any }) {
  const { patientId } = context.params;
  const data = await request.json();
  try {
    const attributes = await prisma.treatmentTypeAttribute.findMany({
      where: {
        treatmentTypeId: BigInt(data.treatmentTypeId),
        treatmentId: null,
        value: null,
      },
    });
    let attributeValues = [];
    for (const attribute of attributes) {
      const value = data[attribute.name];
      if (value) {
        attributeValues.push({
          name: attribute.name,
          value: value,
          treatmentTypeId: attribute.treatmentTypeId,
        });
      }
    }

    const results = await prisma.treatmentTypeResult.findMany({
      where: {
        treatmentTypeId: BigInt(data.treatmentTypeId),
        treatmentId: null,
        value: null,
      },
    });
    let resultValues = [];
    for (const result of results) {
      const value = data[result.name];
      if (value) {
        resultValues.push({
          name: result.name,
          value: value,
          treatmentTypeId: result.treatmentTypeId,
        });
      }
    }

    const treatment = await prisma.treatment.update({
      where: {
        id: BigInt(data.id),
      },
      data: {
        patientId: BigInt(patientId),
        treatmentTypeId: BigInt(data.treatmentTypeId),
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        treatmentTypeAttributes: {
          deleteMany: {},
          createMany: {
            data: attributeValues,
          },
        },
        treatmentTypeResults: {
          deleteMany: {},
          createMany: {
            data: resultValues,
          },
        },
      },
    });

    return NextResponse.json({
      status: 201,
      data: treatment,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
