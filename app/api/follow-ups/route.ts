import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const followUp = await prisma.followUp.create({
      data: {
        patientId: BigInt(data.patientId),
        date: new Date(data.date),
        attended: data.attended ? Boolean(data.attended) : null,
        died: data.died ? Boolean(data.died) : null,
        hasDisease: data.hasDisease ? Boolean(data.hasDisease) : null,
        causeOfDeath: data.causeOfDeath || null,
        observations: data.observations || null,
        recurrenceSite: data.recurrenceSite || null,
      },
    });
    return NextResponse.json({
      status: 201,
      followUp,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
