"use client";

import { type Table as TableType } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface NestedDataTableProps<TData> {
  table: TableType<TData>;
}

export default function NestedDataTable<TData>({
  table,
}: NestedDataTableProps<TData>) {
  // Track seen item names to only show first occurrence
  const seenItems = new Set<string>();

  return (
    <div className="rounded-md border bg-background">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-muted/50 hover:bg-muted/50"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="h-9 text-xs">
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
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            const itemName = row.getValue("item") as string;
            const isFirstOccurrence = !seenItems.has(itemName);
            if (isFirstOccurrence) {
              seenItems.add(itemName);
            }

            return (
              <TableRow key={row.id} className="hover:bg-muted/30">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-2 text-sm">
                    {cell.column.id === "item" && !isFirstOccurrence
                      ? null
                      : flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
