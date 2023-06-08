import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/bigIntExtensions';

export async function PUT(request: Request, context: { params: any }) {
  const id = context.params.id;
  const data = await request.json();

  let attributes = [];
  let results = [];
  for (const key in data) {
    const keys = ['startDate', 'endDate', 'patientId', 'treatmentTypeId', 'id'];
    if (keys.indexOf(key) === -1) {
      if (key.startsWith('attr-')) {
        const keyName = key.split('-')[1];
        attributes.push({
          name: keyName,
          treatmentTypeId: BigInt(data.treatmentTypeId),
          value: data[key],
        });
      } else {
        const keyName = key.split('-')[1];
        results.push({
          name: keyName,
          treatmentTypeId: BigInt(data.treatmentTypeId),
          value: data[key],
        });
      }
    }
  }
  try {
    let treatment;
    if (attributes.length === 0 && results.length === 0) {
      treatment = await prisma.treatment.update({
        where: {
          id: BigInt(id),
        },
        data: {
          patientId: BigInt(data.patientId),
          treatmentTypeId: BigInt(data.treatmentTypeId),
          startDate: data.startDate ? new Date(data.startDate) : null,
          endDate: data.endDate ? new Date(data.endDate) : null,
        },
        include: {
          treatmentType: true,
          treatmentTypeAttributes: true,
        },
      });
    } else {
      treatment = await prisma.treatment.update({
        where: {
          id: BigInt(id),
        },
        data: {
          startDate: data.startDate ? new Date(data.startDate) : null,
          endDate: data.endDate ? new Date(data.endDate) : null,
          patientId: BigInt(data.patientId),
          treatmentTypeId: BigInt(data.treatmentTypeId),
          treatmentTypeAttributes: {
            deleteMany: {},
            createMany: {
              data: attributes,
            },
          },
          treatmentTypeResults: {
            deleteMany: {},
            createMany: {
              data: results,
            },
          },
        },
        include: {
          treatmentType: true,
          treatmentTypeAttributes: true,
          treatmentTypeResults: true,
        },
      });
    }

    return NextResponse.json({
      status: 204,
      treatment,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const treatment = await prisma.treatment.delete({
      where: {
        id: BigInt(id),
      },
    });
    return NextResponse.json({
      status: 200,
      treatment,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
