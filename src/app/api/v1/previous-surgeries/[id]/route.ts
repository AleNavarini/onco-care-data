import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/big-int-extensions';

export async function PUT(request: Request) {
  const { id, patientId, surgeryType, observations } = await request.json();

  try {
    const updatedPreviousSurgery = await prisma.previousSurgery.update({
      where: {
        id: BigInt(id),
      },
      data: {
        patientId: BigInt(patientId),
        surgeryType: surgeryType,
        observations: observations || null,
      },
    });

    return NextResponse.json({
      status: 204,
      previousSurgery: updatedPreviousSurgery,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;

  try {
    const deletedPreviousSurgery = await prisma.previousSurgery.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 200,
      previousSurgery: deletedPreviousSurgery,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
