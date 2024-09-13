import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/big-int-extensions';

export async function PUT(request: Request, context: { params: any }) {
  const { patientId } = context.params;
  const data = await request.json();
  try {
    const attributes = await prisma.studyTypeAttribute.findMany({
      where: {
        studyTypeId: BigInt(data.studyTypeId),
        studyId: null,
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
          studyTypeId: attribute.studyTypeId,
        });
      }
    }

    const study = await prisma.study.update({
      where: {
        id: BigInt(data.id),
      },
      data: {
        patientId: BigInt(patientId),
        studyTypeId: BigInt(data.studyTypeId),
        date: new Date(data.date),
        studyTypeAttributes: {
          deleteMany: {},
          createMany: {
            data: attributeValues,
          },
        },
      },
    });

    return NextResponse.json({
      status: 201,
      data: study,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
