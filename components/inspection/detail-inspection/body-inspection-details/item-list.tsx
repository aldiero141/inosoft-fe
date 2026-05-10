/* eslint-disable react-hooks/incompatible-library */
"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table/data-table";
import { InspectionItem } from "@/lib/types/inspection";
import { useDraftInspectionContext } from "@/providers/inspection/draft-inspection-provider";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const columns: ColumnDef<InspectionItem>[] = [
  {
    accessorKey: "item_number",
    header: () => <span>Item No.</span>,
    cell: ({ row }) => <div>{row.original.item_number || "-"}</div>,
  },
  {
    accessorKey: "item_desc",
    header: () => <span>Item Description</span>,
    cell: ({ row }) => (
      <div className="max-w-[300px]">{row.original.item_desc || "-"}</div>
    ),
  },
  {
    accessorKey: "lot_number",
    header: () => <span>Lot No.</span>,
    cell: ({ row }) => <div>{row.original.lot_number || "-"}</div>,
  },
  {
    accessorKey: "alocation",
    header: () => <span>Allocation</span>,
    cell: ({ row }) => <div>{row.original.alocation || "-"}</div>,
  },
  {
    accessorKey: "ownership",
    header: () => <span>Owner</span>,
    cell: ({ row }) => <div>{row.original.ownership || "-"}</div>,
  },
  {
    accessorKey: "condition",
    header: () => <span className="text-center w-full block">Condition</span>,
    cell: ({ row }) => {
      const condition = row.original.condition;
      return (
        <div className="flex flex-col items-center justify-center">
          <span
            className={`font-medium ${
              condition === "Good" ? "text-green-500" : "text-orange-500"
            }`}
          >
            {condition || "-"}
          </span>
          {condition !== "Good" && (
            <span className="bg-teal-500 text-white text-[10px] px-1.5 py-0.5 rounded mt-0.5">
              {row.original.lot_number}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "requested_pcs",
    header: () => <span className="text-center w-full block">PCS</span>,
    meta: { headerClassName: "bg-primary/10", cellClassName: "bg-primary/10" },
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.requested?.pcs?.toLocaleString() || 0}
      </div>
    ),
  },
  {
    accessorKey: "requested_mt",
    header: () => <span className="text-center w-full block">MT</span>,
    meta: { headerClassName: "bg-primary/10", cellClassName: "bg-primary/10" },
    cell: ({ row }) => (
      <div className="text-center">{row.original.requested?.mt || 0}</div>
    ),
  },
  {
    accessorKey: "pending_pcs",
    header: () => <span className="text-center w-full block">PCS</span>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.pending?.pcs?.toLocaleString() || 0}
      </div>
    ),
  },
  {
    accessorKey: "pending_mt",
    header: () => <span className="text-center w-full block">MT</span>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.pending?.mt || 0}</div>
    ),
  },
  {
    accessorKey: "completed_pcs",
    header: () => <span className="text-center w-full block">PCS</span>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.completed?.pcs?.toLocaleString() || 0}
      </div>
    ),
  },
  {
    accessorKey: "completed_mt",
    header: () => <span className="text-center w-full block">MT</span>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.completed?.mt || 0}</div>
    ),
  },
];

export default function ItemList() {
  const { inspection } = useDraftInspectionContext();
  const [showTable, setShowTable] = useState(true);

  const table = useReactTable({
    data: inspection?.items || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const headerGroups = [
    {
      colSpan: 6,
      label: "",
      className: "border-b-0",
    },
    {
      colSpan: 2,
      label: "Requested",
      className: "bg-primary/10 border-b-0 border-r border-white/20",
    },
    {
      colSpan: 2,
      label: "Pending",
      className: "border-b-0 border-r border-white/20",
    },
    {
      colSpan: 2,
      label: "Completed",
      className: "border-b-0",
    },
  ];

  return (
    <section className="space-y-4 my-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-700">Item Information</h1>
        <Button
          variant="ghost"
          className="size-9 bg-teal-50 hover:bg-teal-100"
          onClick={() => setShowTable(!showTable)}
        >
          {showTable ? (
            <ChevronUp className="size-4 text-teal-600" />
          ) : (
            <ChevronDown className="size-4 text-teal-600" />
          )}
        </Button>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          showTable
            ? "max-h-[1000px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <DataTable
          table={table}
          columns={columns}
          hideFooter
          headerGroups={headerGroups}
        />
      </div>
    </section>
  );
}
