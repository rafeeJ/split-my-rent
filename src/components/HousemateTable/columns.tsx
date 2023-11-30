import {
  ColumnDef,
  ColumnHelper,
  createColumnHelper,
} from "@tanstack/react-table";
import { IncomeCell } from "@/components/HousemateTable/IncomeCell";
import { DeleteHousemateButton } from "@/components/HousemateTable/DeleteHousemateButton";

export type THousemate = {
  id: number;
  name: string;
  income: number;
  proportion?: string;
};

const columnHelper = createColumnHelper<THousemate>();

export const columns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("income", {
    cell: IncomeCell,
    id: "income",
  }),
  columnHelper.display({
    header: "Proportion",
    cell: ({ row, table }) => {
      const income = row.getValue("income") as number;

      const totalIncome = table
        .getRowModel()
        .rows.reduce((acc, { original }) => acc + Number(original.income), 0);

      const proportion = (income / totalIncome) * 100;

      return (
        <div>
          {proportion.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
          %
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "delete",
    cell: DeleteHousemateButton,
  }),
];
