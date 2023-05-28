import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;

  try {
    const result = await prisma.patient.delete({
      where: {
        id: BigInt(id),
      },
    });
    console.log(result);

    return NextResponse.json({ status: 200, deletedPatient: result });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
