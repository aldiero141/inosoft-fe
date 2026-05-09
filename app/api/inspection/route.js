import { NextResponse } from "next/server";
import { returnInspectionDummy } from "@/lib/dummy/responseInpections";

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const filteredData = returnInspectionDummy.filter(
    (item) => item.inspection_status_progress.toUpperCase() === status.toUpperCase(),
  );

  const filteredBySearch = filteredData.filter(
    (item) => item.code.toUpperCase().includes(search.toUpperCase()),
  );


  return NextResponse.json({ data: search === "" ? filteredData : filteredBySearch}, { status: 200 });
}
