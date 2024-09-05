import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: any }) {
  const treatmentId = context.params.treatmentId;

  try {
    const complications = await prisma.complication.findMany({
      where: {
        treatmentId: BigInt(treatmentId),
      },
    });

    return NextResponse.json({
      status: 200,
      data: complications,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function POST(request: Request, context: { params: any }) {
  const { treatmentId } = context.params;
  const data = await request.json();

  try {
    const complication = await prisma.complication.create({
      data: {
        treatmentId: BigInt(treatmentId),
        time: data.time,
        type: data.type,
        transfusions: data.transfusions,
      },
    });
    return NextResponse.json({
      status: 201,
      data: complication,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
