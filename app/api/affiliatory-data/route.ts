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
    const newAffiliatoryData = await prisma.affiliatoryData.upsert({
      where: {
        patientId: BigInt(patientId),
      },
      create: {
        patientId: BigInt(patientId),
        firstConsult: firstConsult ? new Date(firstConsult) : null,
        institution: institution || null,
        doctor: doctor || null,
        bmi: bmi ? parseFloat(bmi) : null,
        usualMedication: usualMedication || null,
        socialWorkIntervention: socialWorkIntervention || null,
        firstPregnancyAge: firstPregnancyAge
          ? parseInt(firstPregnancyAge)
          : null,
        lastPregnancyAge: lastPregnancyAge ? parseInt(lastPregnancyAge) : null,
        contraception: contraception || null,
        currentPregnancyControl: currentPregnancyControl || null,
      },
      update: {
        patientId: BigInt(patientId),
        firstConsult: firstConsult ? new Date(firstConsult) : null,
        institution: institution || null,
        doctor: doctor || null,
        bmi: bmi ? parseFloat(bmi) : null,
        usualMedication: usualMedication || null,
        socialWorkIntervention: socialWorkIntervention || null,
        firstPregnancyAge: firstPregnancyAge
          ? parseInt(firstPregnancyAge)
          : null,
        lastPregnancyAge: lastPregnancyAge ? parseInt(lastPregnancyAge) : null,
        contraception: contraception || null,
        currentPregnancyControl: currentPregnancyControl || null,
      },
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
