import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "success post create inspection" },
    { status: 200 },
  );
}
