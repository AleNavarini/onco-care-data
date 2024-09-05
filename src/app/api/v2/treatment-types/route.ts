import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const treatmentTypes = await prisma.treatmentType.findMany({});
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
