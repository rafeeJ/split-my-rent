import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { THousemate } from "@/components/HousemateTable/Columns";
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
  housemates: THousemate[];
}

export function BillTable({
  columns,
  data,
  setData,
  housemates,
}: DataTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    name: true,
    amount: true,
    delete: true,
    applicableHousemates: false,
    splitProportionally: false,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
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
      housemates,
      addRow: () => {
        const maxId = Math.max(...data.map((row) => row.id));
        const newRow: TBill = {
          id: maxId + 1,
          name: "Bill",
          amount: 100,
          applicableHousemates: housemates.map((hm) => hm.id),
          splitProportionally: false,
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

  useEffect(() => {
    // if a housemate is removed, remove them from all bills
    const newBills = data.map((bill) => {
      const newApplicableHousemates = bill.applicableHousemates.filter((hmId) =>
        housemates.some((hm) => hm.id === hmId),
      );
      return {
        ...bill,
        applicableHousemates: newApplicableHousemates,
      };
    });

    setData(newBills);
  }, [housemates]);

  useEffect(() => {
    // if housemate is added, add them to all bills
    const newBills = data.map((bill) => {
      const applicableHousemates = housemates.map((hm) => hm.id);
      return {
        ...bill,
        applicableHousemates,
      };
    });

    setData(newBills);
  }, [housemates]);

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
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.columnDef.size }}
                  >
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
