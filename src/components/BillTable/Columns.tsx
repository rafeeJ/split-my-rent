import { createColumnHelper } from "@tanstack/react-table";
import { CurrencyCell } from "@/components/common/CurrencyCell";
import { DeleteHousemateButton } from "@/components/HousemateTable/DeleteHousemateButton";
import { FilterHousemates } from "@/components/BillTable/FilterHousemates";
import { ApplicableHousemateList } from "@/components/BillTable/ApplicableHousemateList";
import { TextCell } from "@/components/common/TextCell";

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
    cell: TextCell,
  }),
  columnHelper.accessor("amount", {
    cell: CurrencyCell,
    id: "amount",
  }),

  columnHelper.display({
    id: "delete",
    cell: DeleteHousemateButton,
  }),
  columnHelper.accessor("applicableHousemates", {
    header: "Applicable Housemates",
    cell: ApplicableHousemateList,
  }),
  columnHelper.display({
    id: "filter",
    cell: FilterHousemates,
  }),
];
