import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, context: { params: any }) {
  const id = context.params.id;
  const data = await request.json();
  try {
    const followUp = await prisma.followUp.update({
      where: {
        id: BigInt(id),
      },
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
      status: 204,
      followUp: followUp,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const followUp = await prisma.followUp.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 200,
      followUp: followUp,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
