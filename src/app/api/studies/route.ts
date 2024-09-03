import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/big-int-extensions';

export async function POST(request: Request) {
  const data = await request.json();

  let attributes = [];
  for (const key in data) {
    const keys = ['date', 'patientId', 'studyTypeId', 'id'];
    if (keys.indexOf(key) === -1) {
      attributes.push({
        name: key,
        studyTypeId: BigInt(data.studyTypeId),
        value: data[key],
      });
    }
  }
  try {
    let study;
    if (attributes.length === 0) {
      study = await prisma.study.create({
        data: {
          date: new Date(data.date),
          patientId: BigInt(data.patientId),
          studyTypeId: BigInt(data.studyTypeId),
        },
        include: {
          studyType: true,
          studyTypeAttributes: true,
        },
      });
    } else {
      study = await prisma.study.create({
        data: {
          date: new Date(data.date),
          patientId: BigInt(data.patientId),
          studyTypeId: BigInt(data.studyTypeId),
          studyTypeAttributes: {
            createMany: {
              data: attributes,
            },
          },
        },
        include: {
          studyType: true,
          studyTypeAttributes: true,
        },
      });
    }

    return NextResponse.json({
      status: 201,
      study,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
