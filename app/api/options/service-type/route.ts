import { responseServiceType } from "@/lib/dummy/responseServiceType";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ data: responseServiceType }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 });
  }
}
