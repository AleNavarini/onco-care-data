import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, context: { params: any }) {
  const id = context.params.id;
  const { name } = await request.json();
  try {
    const disease = await prisma.disease.update({
      where: {
        id: BigInt(id),
      },
      data: {
        name: name,
      },
    });

    return NextResponse.json({
      status: 204,
      disease,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
export async function GET(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const disease = await prisma.disease.findUnique({
      where: {
        id: BigInt(id),
      },
      include: {
        riskFactors: {
          where: {
            patientId: null,
          },
        },
      },
    });

    return NextResponse.json({
      status: 200,
      disease,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const disease = await prisma.disease.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 200,
      disease,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
