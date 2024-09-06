import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const data = await getServerSession(authOptions);
  const user = data?.user;

  if (!user) return NextResponse.error();

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: user.email!,
      },
    });

    if (!foundUser) return NextResponse.error();
    const { password } = await request.json();

    const encodedPassword = Buffer.from(password).toString('base64');
    await prisma.user.update({
      where: {
        id: foundUser.id,
      },
      data: {
        password: encodedPassword,
      },
    });

    return NextResponse.json({
      status: 204,
      message: 'Password udpated',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
