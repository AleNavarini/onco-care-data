import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all diseases
    const diseases = await prisma.disease.findMany({});

    // Initialize an array to store the result
    const data = await Promise.all(
      diseases.map(async (disease) => {
        const patientCount = await prisma.patient.count({
          where: {
            diseaseId: disease.id,
          },
        });

        return {
          name: disease.name,
          value: patientCount,
        };
      }),
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
