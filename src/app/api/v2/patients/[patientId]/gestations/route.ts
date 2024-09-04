import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: any }) {
  const patientId = context.params.patientId;
  try {
    const gestations = await prisma.gestation.findMany({
      where: {
        patientId: BigInt(patientId),
      },
    });

    return NextResponse.json({
      status: 200,
      data: gestations,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
