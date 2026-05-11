import { NextResponse } from "next/server";
import { SowOptions } from "@/lib/dummy/responseSowOptions";

export async function GET() {
  try {
    return NextResponse.json(
      { data: SowOptions },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 });
  }
}
