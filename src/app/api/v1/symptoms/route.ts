import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/big-int-extensions';

export async function POST(request: Request) {
  const { patientId, name, value } = await request.json();

  try {
    const newSymptom = await prisma.symptom.create({
      data: {
        patientId: BigInt(patientId),
        name: name,
        value: value || null,
      },
    });

    return NextResponse.json({
      status: 201,
      symptom: newSymptom,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
