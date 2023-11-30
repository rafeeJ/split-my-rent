import { THousemate } from "@/components/HousemateTable/Columns";
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
    name: "Rent",
    amount: 1250,
    applicableHousemates: [1, 2],
    splitProportionally: true,
  },
  {
    id: 2,
    name: "Electricity",
    amount: 100,
    applicableHousemates: [1, 2],
    splitProportionally: false,
  },
  {
    id: 3,
    name: "Water",
    amount: 50,
    applicableHousemates: [1, 2],
    splitProportionally: false,
  },
  {
    id: 4,
    name: "Internet",
    amount: 50,
    applicableHousemates: [1, 2],
    splitProportionally: false,
  },
];
