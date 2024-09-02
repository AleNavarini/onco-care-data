import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get the 'months' parameter from the URL, default to 12 if not provided
    const searchParams = request.nextUrl.searchParams;
    const months = parseInt(searchParams.get('months') || '6', 10);

    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - months);

    const patientsWithLatestFollowUp = await prisma.patient.findMany({
      where: {
        status: 'following',
        followUps: {
          some: {},
        },
      },
      include: {
        followUps: {
          orderBy: {
            date: 'desc',
          },
          take: 1,
        },
      },
    });

    const patientsMissingFollowUp = patientsWithLatestFollowUp.filter(
      (patient) => {
        const latestFollowUp = patient.followUps[0];
        return latestFollowUp.date < cutoffDate;
      },
    );

    return NextResponse.json(patientsMissingFollowUp, { status: 200 });
  } catch (error) {
    console.error('Error fetching patients missing follow-up:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
