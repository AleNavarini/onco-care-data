import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '../../../../lib/bigIntExtensions';

export async function PUT(request: Request, context: { params: any }) {
  const id = context.params.id;
  const { patientId, studyTypeId, studyTypeAttributes } = await request.json();

  try {
    let study;
    if (!studyTypeAttributes || studyTypeAttributes.length === 0) {
      study = await prisma.study.update({
        where: {
          id: BigInt(id),
        },
        data: {
          patientId: BigInt(patientId),
          studyTypeId: BigInt(studyTypeId),
        },
      });
    } else {
      study = await prisma.study.update({
        where: {
          id: BigInt(id),
        },
        data: {
          patientId: BigInt(patientId),
          studyTypeId: BigInt(studyTypeId),
          studyTypeAttributes: {
            createMany: {
              data: studyTypeAttributes,
            },
          },
        },
      });
    }

    return NextResponse.json({
      status: 204,
      study,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const study = await prisma.study.delete({
      where: {
        id: BigInt(id),
      },
    });
    return NextResponse.json({
      status: 200,
      study,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
