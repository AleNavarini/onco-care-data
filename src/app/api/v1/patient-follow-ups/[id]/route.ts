import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: any }) {
  const id = context.params.id;

  try {
    const followUps = await prisma.followUp.findMany({
      where: {
        patientId: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 200,
      followUps,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
