import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/*
This should get a 
{
  patientId: "id"
  birth : true
}
with just one field as true, the rest are going to be set by default as false
*/
export async function POST(request: Request) {
  const { patientId, birth, abortion, cesarean } = await request.json();

  try {
    const newGestation = await prisma.gestation.create({
      data: {
        patientId: BigInt(patientId),
        birth: birth ? birth : false,
        abortion: abortion ? abortion : false,
        cesarean: cesarean ? cesarean : false,
      },
    });

    return NextResponse.json({
      status: 201,
      gestation: newGestation,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
