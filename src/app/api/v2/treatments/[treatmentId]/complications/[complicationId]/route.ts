import { NextResponse } from 'next/server';

export async function PUT(request: Request, context: { params: any }) {
  const { treatmentId } = context.params;
  const data = await request.json();

  try {
    const complication = await prisma.complication.update({
      where: {
        id: BigInt(data.id),
      },
      data: {
        treatmentId: BigInt(treatmentId),
        time: data.time,
        type: data.type,
        transfusions: data.transfusions,
      },
    });

    return NextResponse.json({
      status: 204,
      data: complication,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.complicationId;
  try {
    const complication = await prisma.complication.delete({
      where: {
        id: BigInt(id),
      },
    });
    return NextResponse.json({
      status: 200,
      data: complication,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
