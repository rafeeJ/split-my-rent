"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dispatch, SetStateAction } from "react";
import { THousemate } from "@/components/HousemateTable/columns";
import { AddRowButton } from "@/components/HousemateTable/AddRowButton";
import { Button } from "@/components/ui/button";

interface DataTableProps {
  columns: ColumnDef<any, any>[];
  data: THousemate[];
  setData: Dispatch<SetStateAction<THousemate[]>>;
}

export function HouseMateTable({ columns, data, setData }: DataTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
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
        const maxId = Math.max(...data.map((row) => row.id));
        const newRow: THousemate = {
          id: maxId + 1,
          name: "Housemate",
          income: 1000,
        };
        const setFunction = (old: any[]) => [...old, newRow];
        setData(setFunction);
      },
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: THousemate[]) =>
          old.filter((_row: THousemate, index: number) => index !== rowIndex);
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
              <div className={"flex gap-2 items-center justify-center"}>
                <AddRowButton table={table} />
                <Button>Save Housemates</Button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
