import { NextResponse } from "next/server";
import { returnInspectionDummy } from "@/lib/dummy/responseInpections";

export async function GET(request, { params }) {
  const { id } = params;

  const filteredData = returnInspectionDummy.filter(
    (item) => item.code === id,
  );

  return NextResponse.json({ data: search === "" ? filteredData : filteredBySearch}, { status: 200 });
}
