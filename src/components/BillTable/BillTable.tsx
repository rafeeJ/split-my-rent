import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { THousemate } from "@/components/HousemateTable/columns";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddRowButton } from "@/components/HousemateTable/AddRowButton";
import { TBill } from "@/components/BillTable/Columns";

interface DataTableProps {
  columns: ColumnDef<any, any>[];
  data: TBill[];
  setData: Dispatch<SetStateAction<TBill[]>>;
}

export function BillTable({ columns, data, setData }: DataTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old: TBill[]) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
      addRow: () => {
        const newRow: TBill = {
          name: "Bill",
          amount: 500,
        };
        const setFunction = (old: any[]) => [...old, newRow];
        setData(setFunction);
      },
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: TBill[]) =>
          old.filter((_row: TBill, index: number) => index !== rowIndex);
        setData(setFilterFunc);
      },
    },
  });

  if (!data) return null;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              <AddRowButton table={table} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
