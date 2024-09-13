import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import '@/lib/big-int-extensions';

export async function GET(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const attributes = await prisma.treatmentTypeAttribute.findMany({
      where: {
        treatmentTypeId: BigInt(id),
        treatmentId: null,
      },
    });

    return NextResponse.json({
      status: 200,
      data: attributes,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function POST(request: Request, context: { params: any }) {
  const id = context.params.id;
  const { name } = await request.json();

  try {
    const newAttribute = await prisma.treatmentTypeAttribute.create({
      data: {
        name: name,
        treatmentTypeId: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 201,
      data: newAttribute,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
