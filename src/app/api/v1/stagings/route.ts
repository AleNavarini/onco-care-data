import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const staging = await prisma.staging.create({
      data: {
        patientId: BigInt(data.patientId),
        date: new Date(data.date),
        figo: data.figo,
        type: data.type,
      },
    });
    return NextResponse.json({
      status: 201,
      staging,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
