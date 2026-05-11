import { NextResponse } from "next/server";
import { responseLocation } from "@/lib/dummy/responseLocation";

export async function GET() {
  try {
    return NextResponse.json({ data: responseLocation }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 });
  }
}
