import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import '@/lib/big-int-extensions';

export async function PUT(request: Request, context: { params: any }) {
  const id = context.params.gestationId;
  const { patientId, births, abortions, cesareans } = await request.json();
  try {
    const updatedGestation = await prisma.gestation.update({
      where: {
        id: BigInt(id),
      },
      data: {
        patientId: BigInt(patientId),
        births: births ? parseInt(births) : 0,
        abortions: abortions ? parseInt(abortions) : 0,
        cesareans: cesareans ? parseInt(cesareans) : 0,
      },
    });

    return NextResponse.json({
      status: 204,
      gestation: updatedGestation,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.gestationId;

  try {
    const deletedGestation = await prisma.gestation.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 200,
      gestation: deletedGestation,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
