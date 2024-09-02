import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({});

    const active = patients.filter((patient) => patient.status === 'active');
    const following = patients.filter(
      (patient) => patient.status === 'following',
    );

    const data = [
      { name: 'Activa', value: active.length },
      { name: 'En Seguimiento', value: following.length },
    ];

    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
