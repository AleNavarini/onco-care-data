import prisma from '@/lib/prisma';
import '../../../lib/bigIntExtensions';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const treatmentTypes = await prisma.treatmentType.findMany({
      include: {
        attributes: {
          where: {
            value: null,
          },
        },
      },
    });
    return NextResponse.json({
      status: 200,
      treatmentTypes,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
export async function POST(request: Request) {
  const { name } = await request.json();
  try {
    const treatmentType = await prisma.treatmentType.create({
      data: {
        name: name,
      },
    });

    return NextResponse.json({
      status: 201,
      treatmentType,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
