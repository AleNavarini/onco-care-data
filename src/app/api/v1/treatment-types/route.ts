import prisma from '@/lib/prisma';
import '@/lib/big-int-extensions';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const treatmentTypes = await prisma.treatmentType.findMany({
      include: {
        attributes: {
          where: {
            treatment: null,
          },
        },
        results: {
          where: {
            treatment: null,
          },
        },
      },
    });
    return NextResponse.json({
      status: 200,
      treatmentTypes,
      data: treatmentTypes,
      success: true,
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
      data: treatmentType,
      treatmentType,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
