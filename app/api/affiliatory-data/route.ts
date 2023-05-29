import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const {
    patientId,
    firstConsult,
    institution,
    doctor,
    bmi,
    usualMedication,
    socialWorkIntervention,
    firstPregnancyAge,
    lastPregnancyAge,
    contraception,
    currentPregnancyControl,
  } = await request.json();

  try {
    const newAffiliatoryData = await prisma.affiliatoryData.create({
      data: {
        patientId: BigInt(patientId),
        firstConsult: firstConsult || null,
        institution: institution || null,
        doctor: doctor || null,
        bmi: bmi || null,
        usualMedication: usualMedication || null,
        socialWorkIntervention: socialWorkIntervention || null,
        firstPregnancyAge: firstPregnancyAge || null,
        lastPregnancyAge: lastPregnancyAge || null,
        contraception: contraception || null,
        currentPregnancyControl: currentPregnancyControl || null,
      },
    });

    return NextResponse.json({
      status: 201,
      affiliatoryData: newAffiliatoryData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
