import { THousemate } from "@/components/HousemateTable/columns";
import { TBill } from "@/components/BillTable/Columns";

export const defaultHousemates: THousemate[] = [
  {
    id: 1,
    name: "John Doe",
    income: 1000,
  },
  {
    id: 2,
    name: "Jane Doe",
    income: 2000,
  },
];

export const defaultBills: TBill[] = [
  {
    id: 1,
    name: "Electricity",
    amount: 100,
    applicableHousemates: [1, 2],
  },
  {
    id: 2,
    name: "Water",
    amount: 50,
    applicableHousemates: [1, 2],
  },
  {
    id: 3,
    name: "Internet",
    amount: 50,
    applicableHousemates: [1, 2],
  },
];
