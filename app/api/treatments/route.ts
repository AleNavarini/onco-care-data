import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '../../../lib/bigIntExtensions';

export async function POST(request: Request) {
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
      treatment = await prisma.treatment.create({
        data: {
          patientId: BigInt(data.patientId),
          treatmentTypeId: BigInt(data.treatmentTypeId),
          startDate: data.startDate ? new Date(data.startDate) : null,
          endDate: data.endDate ? new Date(data.endDate) : null,
        },
        include: {
          treatmentType: true,
          treatmentTypeAttributes: true,
          treatmentTypeResults: true,
        },
      });
    } else {
      treatment = await prisma.treatment.create({
        data: {
          patientId: BigInt(data.patientId),
          treatmentTypeId: BigInt(data.treatmentTypeId),
          startDate: data.startDate ? new Date(data.startDate) : null,
          endDate: data.endDate ? new Date(data.endDate) : null,
          treatmentTypeAttributes: {
            createMany: {
              data: attributes,
            },
          },
          treatmentTypeResults: {
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
      status: 201,
      treatment,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
