import {
  ColumnDef,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { Button } from "../../ui/button";
import { ChevronRight, InfoIcon, PlusIcon } from "lucide-react";
import SortableHeader from "../../ui/table/sortable-header";
import { useInspectionContext } from "@/providers/inspection/inspection-provider";
import { InspectionInterface, InspectionItem } from "@/lib/types/inspection";
import { CollapsibleTable } from "../../ui/table/collapsible-table";
import { DataTable } from "../../ui/table/data-table";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { setInspection } from "@/store/slices/inspectionSlice";
import { useDispatch } from "react-redux";
import { format } from "date-fns";

const formatDate = (date: number) => {
  return format(new Date(date * 1000), "dd MMM yyyy");
};

// Column definitions
const columns: ColumnDef<InspectionInterface>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <SortableHeader column={column}>Request No.</SortableHeader>
    ),
    cell: ({ row }) => <div className="font-medium">{row.original.code}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <SortableHeader column={column}>Location</SortableHeader>
    ),
    cell: ({ row }) => {
      const location = row.original.location;
      return <div>{location}</div>;
    },
  },
  {
    accessorKey: "sow",
    header: ({ column }) => (
      <div className="">
        <SortableHeader column={column}>Scope Of Work</SortableHeader>
      </div>
    ),
    cell: ({ row }) => {
      const sow_code = row.original.sow_code;
      const sow = row.original.sow as { template_name: string }[];
      const formatted = sow.map((item) => item.template_name).join(", ");

      return (
        <div className=" flex flex-row items-center gap-2">
          {sow_code}
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="size-4 text-blue-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{formatted}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <div className="">
        <SortableHeader column={column}>Type</SortableHeader>
      </div>
    ),
    cell: ({ row }) => {
      const type = row.original.type;
      return <div className=" font-medium">{type}</div>;
    },
  },
  {
    accessorKey: "date_submitted",
    header: ({ column }) => (
      <div className="">
        <SortableHeader column={column}>Date Submitted</SortableHeader>
      </div>
    ),
    cell: ({ row }) => {
      const date = formatDate(row.original.date_submitted);
      return <div className=" font-medium">{date}</div>;
    },
  },
  {
    accessorKey: "ecd",
    header: ({ column }) => (
      <div className="">
        <SortableHeader column={column}>ECD</SortableHeader>
      </div>
    ),
    cell: ({ row }) => {
      const date = formatDate(row.original.ecd);
      return <div className=" font-medium">{date}</div>;
    },
  },
  {
    accessorKey: "related_to",
    header: ({ column }) => (
      <div className="">
        <SortableHeader column={column}>Related To</SortableHeader>
      </div>
    ),
    cell: ({ row }) => {
      const related_to = row.original.related_to;
      return <div className=" font-medium text-primary">{related_to}</div>;
    },
  },
  {
    accessorKey: "third_party",
    header: ({ column }) => (
      <div className="">
        <SortableHeader column={column}>Third Party</SortableHeader>
      </div>
    ),
    cell: ({ row }) => {
      const third_party = row.original.third_party;
      return (
        <div className="flex items-center justify-center font-medium rounded-full size-6 bg-primary text-white">
          {third_party}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="">
        <SortableHeader column={column}>Status</SortableHeader>
      </div>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div
          className={cn(
            "text-sm text-muted-foreground font-medium border rounded-full w-30 flex items-center justify-center h-6",
            status === "Draft"
              ? "bg-muted"
              : status === "New"
                ? "bg-white"
                : "bg-white",
          )}
        >
          {status}
        </div>
      );
    },
  },
  {
    id: "action",
    accessorKey: "action",
    header: () => <div className="">Action</div>,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const dispatch = useDispatch();

      const handleClick = (row: InspectionInterface) => {
        dispatch(setInspection(row));
        redirect(`/inspection/${row.id}`);
      };

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-primary"
              onClick={() => handleClick(row.original)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Detail</p>
          </TooltipContent>
        </Tooltip>
      );
    },
    enableSorting: false,
  },
];

const itemColumns: ColumnDef<InspectionItem>[] = [
  {
    accessorKey: "item_desc",
    header: ({ column }) => (
      <div className="">
        <SortableHeader column={column}>Description</SortableHeader>
      </div>
    ),
  },
  {
    accessorKey: "ownership",
    header: ({ column }) => (
      <div className="">
        <SortableHeader column={column}>Ownership</SortableHeader>
      </div>
    ),
  },
  {
    accessorKey: "item_quantity",
    header: ({ column }) => (
      <div className="">
        <SortableHeader column={column}>Quantity</SortableHeader>
      </div>
    ),
  },
  {
    accessorKey: "lot_number",
    header: ({ column }) => (
      <div className="">
        <SortableHeader column={column}>Lot Number</SortableHeader>
      </div>
    ),
  },
  {
    accessorKey: "progress",
    header: ({ column }) => (
      <div className="">
        <SortableHeader column={column}>Progress (%)</SortableHeader>
      </div>
    ),
  },
];

function ItemsSubTable({ items }: { items: InspectionItem[] }) {
  const table = useReactTable({
    data: items || [],
    columns: itemColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="pb-2">
      <DataTable table={table} columns={itemColumns} hideFooter />
    </div>
  );
}

export default function TableInspection() {
  const { listInspection } = useInspectionContext();
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: listInspection,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    getRowCanExpand: () => true,
  });
  return (
    <div className="px-6 py-2 flex flex-col gap-2">
      <Button className="self-end" onClick={() => redirect("/inspection/add")}>
        <PlusIcon className="text-white size-4" />
        Create Request
      </Button>
      <CollapsibleTable
        table={table}
        columns={columns}
        renderSubComponent={({ row }) => (
          <ItemsSubTable items={row.original.items} />
        )}
      />
    </div>
  );
}
