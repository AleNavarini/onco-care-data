import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import '@/lib/big-int-extensions';
export async function GET(request: Request, context: { params: any }) {
  const patientId = context.params.patientId;

  try {
    const affiliatoryData = await prisma.affiliatoryData.findUnique({
      where: {
        patientId: BigInt(patientId),
      },
    });

    if (!affiliatoryData)
      return NextResponse.json({
        status: 404,
        message: 'Affiliatory data not found',
      });

    return NextResponse.json({
      status: 200,
      affiliatoryData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function PUT(request: Request, context: { params: any }) {
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
    const updatedAffiliatoryData = await prisma.affiliatoryData.update({
      where: {
        patientId: BigInt(patientId),
      },
      data: {
        patientId: BigInt(patientId),
        firstConsult: firstConsult ? new Date(firstConsult) : null,
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
      status: 204,
      affiliatoryData: updatedAffiliatoryData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
