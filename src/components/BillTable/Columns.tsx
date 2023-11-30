import { createColumnHelper } from "@tanstack/react-table";
import { IncomeCell } from "@/components/HousemateTable/IncomeCell";
import { DeleteHousemateButton } from "@/components/HousemateTable/DeleteHousemateButton";

export type TBill = {
  name: string;
  amount: number;
};

const columnHelper = createColumnHelper<TBill>();

export const columns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("amount", {
    cell: IncomeCell,
    id: "Amount",
  }),
  columnHelper.display({
    id: "delete",
    cell: DeleteHousemateButton,
  }),
];
