import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const studyTypes = await prisma.studyType.findMany({});
    return NextResponse.json({
      status: 200,
      studyTypes,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
export async function POST(request: Request) {
  const { name } = await request.json();
  try {
    const studyType = await prisma.studyType.create({
      data: {
        name: name,
      },
    });

    return NextResponse.json({
      status: 201,
      studyType,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
