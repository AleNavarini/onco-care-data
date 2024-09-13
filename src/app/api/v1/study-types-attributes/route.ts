import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/big-int-extensions';

export async function POST(request: Request) {
  const { name, studyTypeId, studyId } = await request.json();
  try {
    const studyTypeAttribute = await prisma.studyTypeAttribute.create({
      data: {
        name: name,
        studyTypeId: BigInt(studyTypeId),
        studyId: studyId ? BigInt(studyId) : null,
      },
    });

    return NextResponse.json({
      status: 201,
      studyTypeAttribute,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
