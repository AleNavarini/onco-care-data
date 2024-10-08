import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import '@/lib/big-int-extensions';

export async function GET(request: Request, context: { params: any }) {
  const patientId = context.params.patientId;
  try {
    const previousSurgeries = await prisma.previousSurgery.findMany({
      where: {
        patientId: BigInt(patientId),
      },
    });

    return NextResponse.json({
      status: 200,
      data: previousSurgeries,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
