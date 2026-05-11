import { NextResponse } from "next/server";
import { responseItems } from "@/lib/dummy/responseItems";

export async function GET() {
  try {
    return NextResponse.json({ data: responseItems }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 });
  }
}
