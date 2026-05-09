import { NextResponse } from "next/server";
import { returnInspectionDummy } from "@/lib/dummy/responseInpections";

export async function GET() {
  return NextResponse.json({ data: returnInspectionDummy }, { status: 200 });
}
