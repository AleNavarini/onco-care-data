import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/big-int-extensions';
import { Study } from '@prisma/client';

export async function GET(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const studies = await prisma.study.findMany({
      where: {
        patientId: BigInt(id),
      },
      include: {
        studyType: true,
        studyTypeAttributes: true,
      },
    });

    return NextResponse.json({
      status: 200,
      data: studies,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
