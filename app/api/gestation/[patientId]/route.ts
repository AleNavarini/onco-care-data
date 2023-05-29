import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: any }) {
  const patientId = context.params.patientId;

  try {
    const gestations = await prisma.gestation.findMany({
      where: {
        patientId: BigInt(patientId),
      },
    });

    if (!gestations)
      return NextResponse.json({
        status: 404,
        message: 'No gestations found',
      });

    return NextResponse.json({
      status: 200,
      gestations,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
