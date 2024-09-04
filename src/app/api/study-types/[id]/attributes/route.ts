import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const studyTypeAttributes = await prisma.studyTypeAttribute.findMany({
      where: {
        studyTypeId: BigInt(id),
        studyId: null,
        study: null,
        value: null,
      },
    });

    return NextResponse.json({
      status: 200,
      data: studyTypeAttributes,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function POST(request: Request, context: { params: any }) {
  const id = context.params.id;
  const { name } = await request.json();

  try {
    const newStudyTypeAttribute = await prisma.studyTypeAttribute.create({
      data: {
        name: name,
        studyTypeId: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 201,
      data: newStudyTypeAttribute,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function PUT(request: Request, context: { params: any }) {
  const id = context.params.id;
  const data = await request.json();
}
