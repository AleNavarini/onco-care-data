import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/big-int-extensions';

export async function GET(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const studyType = await prisma.studyType.findFirst({
      where: {
        id: BigInt(id),
      },
      include: {
        attributes: true,
      },
    });

    return NextResponse.json({
      status: 200,
      studyType,
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
    const studyType = await prisma.studyType.update({
      where: {
        id: BigInt(id),
      },
      data: {
        name: name,
      },
    });

    return NextResponse.json({
      status: 204,
      studyType,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const studyType = await prisma.studyType.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 200,
      studyType,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
