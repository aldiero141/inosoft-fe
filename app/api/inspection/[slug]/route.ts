import { NextRequest, NextResponse } from "next/server";
import { returnInspectionDummy } from "@/lib/dummy/responseInpections";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
  const { slug } = await params
    const filteredData = returnInspectionDummy.filter(
      (item) => item.id === slug,
    );
    return NextResponse.json({ data: filteredData[0] }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}