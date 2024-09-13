import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/big-int-extensions';

export async function PUT(request: Request, context: { params: any }) {
  const id = context.params.id;
  const data = await request.json();
  try {
    const staging = await prisma.staging.update({
      where: {
        id: BigInt(id),
      },
      data: {
        patientId: BigInt(data.patientId),
        date: new Date(data.date),
        type: data.type,
        figo: data.figo,
      },
    });

    return NextResponse.json({
      status: 204,
      staging: staging,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const staging = await prisma.staging.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 200,
      staging: staging,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
