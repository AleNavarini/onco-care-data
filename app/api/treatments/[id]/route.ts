import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/bigIntExtensions';

export async function PUT(request: Request, context: { params: any }) {
  const { id } = context.params;
  const data = await request.json();
  const { attributes, results } = getAttributesAndResults(data);
  const updateData = getUpdateData(data, attributes, results);

  const include = {
    treatmentType: true,
    treatmentTypeAttributes: true,
    treatmentTypeResults: true,
    complications: true,
  };

  try {
    const treatment = await prisma.treatment.update({
      where: { id: BigInt(id) },
      data: updateData,
      include: include,
    });

    return NextResponse.json({
      status: 204,
      treatment,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

function getUpdateData(
  data: any,
  attributes: { name: string; treatmentTypeId: bigint; value: any }[],
  results: { name: string; treatmentTypeId: bigint; value: any }[],
) {
  return {
    startDate: data.startDate ? new Date(data.startDate) : null,
    endDate: data.endDate ? new Date(data.endDate) : null,
    patientId: BigInt(data.patientId),
    treatmentTypeId: BigInt(data.treatmentTypeId),
    ...(attributes.length || results.length
      ? {
          treatmentTypeAttributes: {
            deleteMany: {},
            createMany: { data: attributes },
          },
          treatmentTypeResults: {
            deleteMany: {},
            createMany: { data: results },
          },
        }
      : {}),
  };
}

function getAttributesAndResults(data: any) {
  let attributes = [];
  let results = [];
  const nonAttributeOrResultKeys = [
    'startDate',
    'endDate',
    'patientId',
    'treatmentTypeId',
    'id',
  ];

  for (const key in data) {
    const keyIsAttributeOrResult = nonAttributeOrResultKeys.indexOf(key) === -1;
    if (keyIsAttributeOrResult) {
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
  return { attributes, results };
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
