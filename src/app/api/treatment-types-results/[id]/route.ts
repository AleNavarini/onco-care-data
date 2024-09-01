import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, context: { params: any }) {
  const id = context.params.id;
  const { name, treatmentTypeId, treatmentId } = await request.json();
  try {
    const treatmentTypeResult = await prisma.treatmentTypeResult.update({
      where: {
        id: BigInt(id),
      },
      data: {
        name: name,
        treatmentTypeId: BigInt(treatmentTypeId),
        treatmentId: treatmentId ? BigInt(treatmentId) : null,
      },
    });

    return NextResponse.json({
      status: 204,
      treatmentTypeResult,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const treatmentTypeResult = await prisma.treatmentTypeResult.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 200,
      treatmentTypeResult,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
