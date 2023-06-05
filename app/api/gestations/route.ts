import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const patientId = request.nextUrl.searchParams.get('patientId');
  if (!patientId) return NextResponse.error();
  try {
    const gestations = await prisma.gestation.findUnique({
      where: {
        patientId: BigInt(patientId),
      },
    });

    return NextResponse.json({
      status: 200,
      gestations,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  const { patientId, births, abortions, cesareans } = await request.json();
  

  try {
    const newGestation = await prisma.gestation.create({
      data: {
        patientId: BigInt(patientId),
        births: parseInt(births),
        abortions: parseInt(abortions),
        cesareans: parseInt(cesareans),
      },
    });

    return NextResponse.json({
      status: 201,
      gestation: newGestation,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
