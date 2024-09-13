import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import '@/lib/big-int-extensions';

export async function GET(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const studyTypeAttributes = await prisma.studyTypeAttribute.findMany({
      where: {
        studyTypeId: BigInt(id),
        studyId: null,
        study: null,
        value: null,
      },
    });

    return NextResponse.json({
      status: 200,
      data: studyTypeAttributes,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
