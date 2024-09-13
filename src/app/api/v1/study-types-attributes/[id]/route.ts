import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/big-int-extensions';

export async function PUT(request: Request, context: { params: any }) {
  const id = context.params.id;
  const { name, studyTypeId, studyId } = await request.json();

  try {
    const studyTypeAttribute = await prisma.studyTypeAttribute.update({
      where: {
        id: BigInt(id),
      },
      data: {
        name: name,
        studyTypeId: BigInt(studyTypeId),
        studyId: studyId ? BigInt(studyId) : null,
      },
    });

    return NextResponse.json({
      status: 204,
      studyTypeAttribute,
      data: studyTypeAttribute,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const studyTypeAttribute = await prisma.studyTypeAttribute.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 200,
      studyTypeAttribute,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
