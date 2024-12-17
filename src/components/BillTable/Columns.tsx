import { createColumnHelper } from "@tanstack/react-table";
import { CurrencyCell } from "@/components/common/CurrencyCell";
import { ApplicableHousemateList } from "@/components/BillTable/ApplicableHousemateList";
import { TextCell } from "@/components/common/TextCell";
import { EditBillDialog } from "@/components/BillTable/EditBillDialog";
import { DeleteBillButton } from "@/components/BillTable/DeleteBillButton";

export type TBill = {
  id: number;
  name: string;
  amount: number;
  applicableHousemates: number[];
  splitProportionally: boolean;
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
    id: "edit",
    cell: EditBillDialog,
  }),
  columnHelper.display({
    id: "delete",
    cell: DeleteBillButton,
  }),
  columnHelper.accessor("applicableHousemates", {
    header: "Applicable Housemates",
    cell: ApplicableHousemateList,
  }),
  columnHelper.accessor("splitProportionally", {
    header: "Split Proportionally",
    cell: TextCell,
  }),
];
