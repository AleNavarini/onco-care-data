import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch distinct figo values from the staging table
    const figos = await prisma.staging.findMany({
      distinct: ['figo'],
      select: {
        figo: true,
      },
    });

    // Extract figo values into an array
    const figoValues = figos.map((staging) => staging.figo);

    // Fetch patients whose stagings have figo values in the figoValues array
    const patients = await prisma.patient.findMany({
      where: {
        stagings: {
          some: {
            figo: {
              in: figoValues,
            },
          },
        },
      },
      include: {
        stagings: true, // Include stagings to access the figo field
      },
    });

    // Create the data array with the count of patients for each figo value
    const data = figoValues.map((figo) => ({
      name: figo,
      value: patients.filter((patient) =>
        patient.stagings.some((staging) => staging.figo === figo),
      ).length,
    }));

    // Return the data as JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
