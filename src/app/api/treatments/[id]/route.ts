import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/big-int-extensions';
import { getAttributesAndResults } from '@/utils/get-attributes-and-results';

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

function getUpdateData(
  data: any,
  attributes: { name: string; treatmentTypeId: bigint; value: any }[],
  results: { name: string; treatmentTypeId: bigint; value: any }[],
) {
  return {
    patientId: BigInt(data.patientId),
    treatmentTypeId: BigInt(data.treatmentTypeId),
    startDate: data.startDate ? new Date(data.startDate) : null,
    endDate: data.endDate ? new Date(data.endDate) : null,
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
