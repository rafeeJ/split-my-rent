import { createColumnHelper } from "@tanstack/react-table";
import { CurrencyCell } from "@/components/common/CurrencyCell";
import { DeleteHousemateButton } from "@/components/HousemateTable/DeleteHousemateButton";
import { TextCell } from "@/components/common/TextCell";

export type THousemate = {
  id: number;
  name: string;
  income: number;
  rentShare: number;
};

const columnHelper = createColumnHelper<THousemate>();

export const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: TextCell,
  }),
  columnHelper.accessor("income", {
    header: "Income",
    cell: CurrencyCell,
    id: "income",
  }),
  // columnHelper.display({
  //   header: "Proportion",
  //   cell: ({ row, table }) => {
  //     const income = row.getValue("income") as number;
  //
  //     const totalIncome = table
  //       .getRowModel()
  //       .rows.reduce((acc, { original }) => acc + Number(original.income), 0);
  //
  //     const proportion = (income / totalIncome) * 100;
  //
  //     return (
  //       <span>
  //         {proportion.toLocaleString(undefined, {
  //           maximumFractionDigits: 2,
  //         })}
  //         %
  //       </span>
  //     );
  //   },
  // }),
  columnHelper.display({
    id: "delete",
    cell: DeleteHousemateButton,
  }),
];
