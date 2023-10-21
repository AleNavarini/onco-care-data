import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '../../../lib/bigIntExtensions';
import { getAttributesAndResults } from '@/utils/getAttributesAndResults';

export async function POST(request: Request) {
  const data = await request.json();
  const { attributes, results } = getAttributesAndResults(data);
  const createData = getCreateData(data, attributes, results);
  const include = {
    treatmentType: true,
    treatmentTypeAttributes: true,
    treatmentTypeResults: true,
    complications: true,
  };

  try {
    const treatment = await prisma.treatment.create({
      data: createData,
      include: include,
    });

    return NextResponse.json({
      status: 201,
      treatment,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

function getCreateData(
  data: any,
  attributes: { name: string; treatmentTypeId: bigint; value: any }[],
  results: { name: string; treatmentTypeId: bigint; value: any }[],
) {
  const commonData = {
    patientId: BigInt(data.patientId),
    treatmentTypeId: BigInt(data.treatmentTypeId),
    startDate: data.startDate ? new Date(data.startDate) : null,
    endDate: data.endDate ? new Date(data.endDate) : null,
  };

  const attributeData =
    attributes.length > 0
      ? {
          treatmentTypeAttributes: {
            createMany: {
              data: attributes,
            },
          },
        }
      : {};

  const resultData =
    results.length > 0
      ? {
          treatmentTypeResults: {
            createMany: {
              data: results,
            },
          },
        }
      : {};

  const createData = {
    ...commonData,
    ...attributeData,
    ...resultData,
  };
  return createData;
}
