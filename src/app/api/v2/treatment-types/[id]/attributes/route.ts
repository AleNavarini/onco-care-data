import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, context: { params: any }) {
  const id = context.params.id;
  try {
    const treatmentType = await prisma.treatmentType.findUnique({
      where: {
        id: BigInt(id),
      },
      include: {
        attributes: {
          where: {
            value: null,
            treatmentId: null,
          },
        },
      },
    });

    return NextResponse.json({
      status: 200,
      data: treatmentType,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
