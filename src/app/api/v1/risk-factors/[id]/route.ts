import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, context: { params: any }) {
  const id = context.params.id;
  const data = await request.json();

  try {
    const riskFactor = await prisma.riskFactor.update({
      where: {
        id: BigInt(id),
      },
      data: {
        name: data.name,
        diseaseId: data.diseaseId ? BigInt(data.diseaseId) : null,
        patientId: data.patientId ? BigInt(data.patientId) : null,
        value: data.value || null,
      },
    });

    return NextResponse.json({
      status: 204,
      riskFactor: riskFactor,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const riskFactor = await prisma.riskFactor.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 200,
      riskFactor: riskFactor,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
