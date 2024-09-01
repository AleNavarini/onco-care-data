import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/bigIntExtensions';

export async function GET(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const treatmentType = await prisma.treatmentType.findFirst({
      where: {
        id: BigInt(id),
      },
      include: {
        attributes: true,
        results: true,
      },
    });

    return NextResponse.json({
      status: 200,
      treatmentType,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
export async function PUT(request: Request, context: { params: any }) {
  const id = context.params.id;
  const { name } = await request.json();
  try {
    const treatmentType = await prisma.treatmentType.update({
      where: {
        id: BigInt(id),
      },
      data: {
        name: name,
      },
    });

    return NextResponse.json({
      status: 204,
      treatmentType,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;

  try {
    const treatmentType = await prisma.treatmentType.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 200,
      treatmentType,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
