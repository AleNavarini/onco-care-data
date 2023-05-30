import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { id, patientId, surgeryType, observations } = await request.json();

  try {
    const newPreviousSurgery = await prisma.previousSurgery.create({
      data: {
        patientId: BigInt(patientId),
        surgeryType: surgeryType,
        observations: observations || null,
      },
    });

    return NextResponse.json({
      status: 201,
      previousSurgery: newPreviousSurgery,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
