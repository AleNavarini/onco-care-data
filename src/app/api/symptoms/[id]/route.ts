import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const { id, patientId, name, value } = await request.json();

  try {
    const updatedSymptom = await prisma.symptom.update({
      where: {
        id: BigInt(id),
      },
      data: {
        patientId: BigInt(patientId),
        name: name,
        value: value || null,
      },
    });

    return NextResponse.json({
      status: 204,
      symptom: updatedSymptom,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;

  try {
    const deletedSymptom = await prisma.symptom.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 200,
      symptom: deletedSymptom,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
