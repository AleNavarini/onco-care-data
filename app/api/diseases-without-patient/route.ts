import '../../../lib/bigIntExtensions';
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
