import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;

  try {
    const result = prisma.patient.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ status: 200, deletedPatient: result });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
