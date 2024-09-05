import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: any }) {
  const id = context.params.id;

  try {
    const riskFactors = await prisma.riskFactor.findMany({
      where: {
        patientId: BigInt(id),
      },
    });
    return NextResponse.json({
      status: 200,
      riskFactors,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
