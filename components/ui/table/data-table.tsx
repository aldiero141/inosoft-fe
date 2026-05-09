"use client";

import * as React from "react";
import { ColumnDef, type Table as TableType } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
interface DataTableProps<TData> {
  table: TableType<TData>;
  columns: ColumnDef<TData>[];
  hideFooter?: boolean;
  headerGroups?: {
    colSpan: number;
    label: string;
  }[];
}

export function DataTable<TData>({
  table,
  columns,
  hideFooter = false,
  headerGroups,
}: DataTableProps<TData>) {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          {headerGroups && headerGroups.length > 0 ? (
            <TableHeader>
              {/* Parent grouped header row */}
              <TableRow className="hover:bg-transparent border-b-0">
                {headerGroups.map((group, index) => (
                  <TableHead
                    key={index}
                    colSpan={group.colSpan}
                    className={cn(
                      "h-8 text-center text-sm font-medium text-muted-foreground",
                      group.label && "border-b-2 border-primary/60",
                    )}
                  >
                    {group.label}
                  </TableHead>
                ))}
              </TableRow>
              {/* Sub-header row */}
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-muted/30 hover:bg-muted/30"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="h-8 text-xs">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
          ) : (
            <TableHeader className="bg-primary/5">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
          )}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      row.getIsExpanded() && "bg-muted/50 border-b-0",
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!hideFooter && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <p className="text-sm text-muted-foreground">
            {table.getRowModel().rows.length} row(s) total
          </p>
        </div>
      )}
    </div>
  );
}
