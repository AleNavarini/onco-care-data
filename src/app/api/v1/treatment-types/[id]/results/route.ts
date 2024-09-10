import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, context: { params: any }) {
  const id = context.params.id;
  try {
    const results = await prisma.treatmentTypeResult.findMany({
      where: {
        treatmentTypeId: BigInt(id),
        treatmentId: null,
      },
    });

    return NextResponse.json({
      status: 200,
      data: results,
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
    const newResult = await prisma.treatmentTypeResult.create({
      data: {
        name: name,
        treatmentTypeId: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 201,
      data: newResult,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
