import prisma from '@/lib/prisma';
import { getFollowUpsData } from '@/utils/get-follow-ups-data';
import { NextResponse } from 'next/server';
import '@/lib/big-int-extensions';

export async function POST(request: Request) {
  const data = await request.json();
  const createData = getFollowUpsData(data);

  try {
    const followUp = await prisma.followUp.create({
      data: createData,
    });
    return NextResponse.json({
      status: 201,
      followUp,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
