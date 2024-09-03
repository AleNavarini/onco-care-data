import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import "@/lib/big-int-extensions";

export async function GET(request: Request, context: { params: any }) {
  const id = context.params.id;
  try {
    const riskFactors = await prisma.riskFactor.findMany({
      where: {
        diseaseId: BigInt(id),
        patientId: null,
      },
    });

    return NextResponse.json({
      status: 200,
      data: riskFactors,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}