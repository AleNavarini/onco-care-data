import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
  try {
    const diseases = await prisma.disease.findMany({});

    return NextResponse.json({
      status: 200,
      diseases,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error;
  }
}

export async function POST(request: Request) {
  const { name } = await request.json();
  try {
    const disease = await prisma.disease.create({
      data: {
        name: name,
      },
    });

    return NextResponse.json({
      status: 201,
      disease,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
