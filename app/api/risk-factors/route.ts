import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const riskFactor = await prisma.riskFactor.create({
      data: {
        name: data.name,
        value: data.value || null,
        diseaseId: data.diseaseId ? BigInt(data.diseaseId) : null,
        patientId: data.patientId ? BigInt(data.patientId) : null,
      },
    });

    return NextResponse.json({
      status: 201,
      riskFactor,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
