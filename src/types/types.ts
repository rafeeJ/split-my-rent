import { THousemate } from "@/components/HousemateTable/Columns";
import { TBill } from "@/components/BillTable/Columns";

export type TCurrency =
  | "GBP"
  | "USD"
  | "EUR"
  | "CAD"
  | "AUD"
  | "NZD"
  | "JPY"
  | "CNY"
  | "HKD";

export type TDistribution = "custom" | "equally" | "proportionally";

export type THousemateTotal = {
  housemate: THousemate;
  share: {
    name: string;
    amount: number;
  }[];
  total: number;
};
