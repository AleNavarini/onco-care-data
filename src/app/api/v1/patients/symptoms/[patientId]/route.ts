import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, context: { params: any }) {
  const patientId = context.params.patientId;

  try {
    const symptoms = await prisma.symptom.findMany({
      where: {
        patientId: BigInt(patientId),
      },
    });

    return NextResponse.json({
      status: 200,
      data: symptoms,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
