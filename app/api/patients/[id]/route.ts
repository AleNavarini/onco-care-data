import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: BigInt(id),
      },
    });

    if (!patient)
      return NextResponse.json({
        status: 404,
        message: 'Patient not found',
      });

    return NextResponse.json({
      status: 200,
      patient,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
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
