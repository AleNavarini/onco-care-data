import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const complication = await prisma.complication.create({
      data: {
        treatmentId: BigInt(data.treatmentId),
        type: data.type ? data.type : null,
        time: data.time ? data.time : null,
        transfusions: data.transfusions ? data.transfusions : null,
      },
    });
    return NextResponse.json({
      status: 201,
      complication,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
