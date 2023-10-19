import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const data = await request.json();
  const upsertObject = getUpsertObject(data);
  try {
    const newAffiliatoryData = await prisma.affiliatoryData.upsert({
      where: {
        patientId: BigInt(data.patientId),
      },
      create: upsertObject,
      update: upsertObject,
    });

    return NextResponse.json({
      status: 200,
      affiliatoryData: newAffiliatoryData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

const getUpsertObject = (data: any) => {
  return {
    patientId: BigInt(data.patientId),
    firstConsult: data.firstConsult ? new Date(data.firstConsult) : null,
    institution: data.institution || null,
    doctor: data.doctor || null,
    bmi: data.bmi ? parseFloat(data.bmi) : null,
    usualMedication: data.usualMedication || null,
    socialWorkIntervention: data.socialWorkIntervention || null,
    firstPregnancyAge: data.firstPregnancyAge
      ? parseInt(data.firstPregnancyAge)
      : null,
    lastPregnancyAge: data.lastPregnancyAge
      ? parseInt(data.lastPregnancyAge)
      : null,
    contraception: data.contraception || null,
    currentPregnancyControl: data.currentPregnancyControl || null,
  };
};
