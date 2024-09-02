import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/big-int-extensions';

export async function GET(request: Request, context: { params: any }) {
  const { id } = context.params;

  try {
    const treatments = await prisma.treatment.findMany({
      where: {
        patientId: BigInt(id),
      },
      include: {
        treatmentTypeAttributes: true,
        treatmentTypeResults: true,
        complications: true,
      },
    });

    return NextResponse.json({
      status: 200,
      treatments,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
