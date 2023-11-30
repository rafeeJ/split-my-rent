import { createColumnHelper } from "@tanstack/react-table";
import { IncomeCell } from "@/components/HousemateTable/IncomeCell";
import { DeleteHousemateButton } from "@/components/HousemateTable/DeleteHousemateButton";
import { FilterHousemates } from "@/components/BillTable/FilterHousemates";
import { ApplicableHousemateList } from "@/components/BillTable/ApplicableHousemateList";

export type TBill = {
  id: number;
  name: string;
  amount: number;
  applicableHousemates: number[];
};

const columnHelper = createColumnHelper<TBill>();

export const columns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("amount", {
    cell: IncomeCell,
    id: "amount",
  }),
  columnHelper.accessor("applicableHousemates", {
    header: "Applicable Housemates",
    cell: ApplicableHousemateList,
  }),
  columnHelper.display({
    id: "filter",
    cell: FilterHousemates,
  }),
  columnHelper.display({
    id: "delete",
    cell: DeleteHousemateButton,
  }),
];
