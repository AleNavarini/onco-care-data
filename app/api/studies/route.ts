import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { patientId, studyTypeId } = await request.json();
  try {
    await prisma.study.create({
      data: {
        patientId: BigInt(patientId),
        studyTypeId: BigInt(studyTypeId),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
