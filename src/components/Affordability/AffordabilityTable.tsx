import { THousemate } from "@/components/HousemateTable/Columns";
import { TBill } from "@/components/BillTable/Columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { useCurrencyContext } from "@/contexts/CurrencyContext";

interface IResultsTableProps {
  housemateData: THousemate[];
  rent: number;
  splitEvenly: boolean;
}

export const AffordabilityTable = ({
  housemateData,
  rent,
  splitEvenly,
}: IResultsTableProps) => {
  const { currency } = useCurrencyContext();

  const calculateHousemateTotals = () => {
    const totalIncome = housemateData.reduce((acc, housemate) => {
      return acc + Number(housemate.income);
    }, 0);

    const housemateTotals = housemateData.map((housemate) => {
      const proportion = (housemate.income / totalIncome) * 100;
      const rentShare = splitEvenly
        ? rent / housemateData.length
        : rent * (proportion / 100);
      return {
        ...housemate,
        proportion,
        rentShare,
      };
    });

    return housemateTotals;
  };

  const housemateTotals = calculateHousemateTotals();

  return (
    <div className={"w-full"}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Housemate</TableHead>
            <TableHead className={"text-right"}>Share of bills</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {housemateTotals.length === 0 && (
            <TableRow>
              <TableCell colSpan={2} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
          {housemateTotals.map((housemate, idx) => {
            const valueToDisplay = housemate.rentShare.toLocaleString(
              undefined,
              {
                style: "currency",
                currency: currency,
              },
            );

            return (
              <TableRow key={idx}>
                <TableCell>{housemate.name}</TableCell>
                <TableCell className={"text-right"}>{valueToDisplay}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
