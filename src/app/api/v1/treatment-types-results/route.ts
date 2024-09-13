import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/big-int-extensions';

export async function POST(request: Request) {
  const { name, treatmentTypeId, treatmentId } = await request.json();
  try {
    const treatmentTypeResult = await prisma.treatmentTypeResult.create({
      data: {
        name: name,
        treatmentTypeId: BigInt(treatmentTypeId),
        treatmentId: treatmentId ? BigInt(treatmentId) : null,
      },
    });

    return NextResponse.json({
      status: 201,
      treatmentTypeResult,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
