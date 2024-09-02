import prisma from '@/lib/prisma';
import { getFollowUpsData } from '@/utils/get-follow-upsData';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, context: { params: any }) {
  const id = context.params.id;
  const data = await request.json();
  const updateData = getFollowUpsData(data);

  try {
    const followUp = await prisma.followUp.update({
      where: {
        id: BigInt(id),
      },
      data: updateData,
    });

    return NextResponse.json({
      status: 204,
      followUp: followUp,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const followUp = await prisma.followUp.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({
      status: 200,
      followUp: followUp,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
