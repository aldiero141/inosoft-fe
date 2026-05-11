import { responseRelation } from "@/lib/dummy/responseRelation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ data: responseRelation }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 });
  }
}
