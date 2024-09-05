import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, context: { params: any }) {
  const id = context.params.id;
  const data = await request.json();
  try {
    const complication = await prisma.complication.update({
      where: {
        id: BigInt(id),
      },
      data: {
        treatmentId: BigInt(data.treatmentId),
        type: data.type ? data.type : null,
        time: data.time ? data.time : null,
        transfusions: data.transfusions ? data.transfusions : null,
      },
    });

    return NextResponse.json({
      status: 204,
      complication,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const complication = await prisma.complication.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 200,
      complication,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
