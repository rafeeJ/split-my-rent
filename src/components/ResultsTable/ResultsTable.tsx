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
import { calculateBillsPerPerson } from "@/lib/calculations/totalPerHousemate";
import { useUserInformationContext } from "@/contexts/UserInformationContext";
import { billsWithRent } from "@/lib/calculations/billsWithRent";

interface IResultsTableProps {
  housemateData: THousemate[];
  billData: TBill[];
}

export const ResultsTable = ({
  housemateData,
  billData,
}: IResultsTableProps) => {
  const { currency } = useCurrencyContext();
  const { rentSplit, rentDistribution, customRentSplit } =
    useUserInformationContext();

  const housemateTotals = calculateBillsPerPerson({ housemateData, billData });
  const housemateTotalsWithRent = billsWithRent(
    housemateTotals,
    rentSplit,
    rentDistribution,
    customRentSplit,
  );

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
          {housemateTotalsWithRent.length === 0 && (
            <TableRow>
              <TableCell colSpan={2} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
          {housemateTotalsWithRent.map((housemate, idx) => {
            const valueToDisplay = housemate.total.toLocaleString(undefined, {
              style: "currency",
              currency: currency,
            });

            const pieChartData = housemateTotalsWithRent.map((entry) => {
              // reduce to 2 decimal places
              const total = Math.round(entry.total * 100) / 100;

              return {
                name: entry.housemate.name,
                total: total,
              };
            });

            const DataTable = () => {
              return (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bill</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {housemate.share.map((bill, idx) => {
                      return (
                        <TableRow key={idx}>
                          <TableCell>
                            <Badge className={"mr-2"}>{bill.name}</Badge>
                          </TableCell>
                          <TableCell>
                            {bill.amount.toLocaleString(undefined, {
                              style: "currency",
                              currency: "GBP",
                            })}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              );
            };

            return (
              <TableRow key={idx}>
                <TableCell>{housemate.housemate.name}</TableCell>
                <TableCell className={"text-right"}>
                  <Dialog>
                    <DialogTrigger className={"font-bold underline"}>
                      <Button className={"gap-2"} variant={"outline"}>
                        {valueToDisplay}
                        <Info />
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className={"flex flex-col justify-center items-center"}
                    >
                      <DialogHeader>
                        <DialogTitle>Detailed View</DialogTitle>
                      </DialogHeader>
                      <div className={"flex flex-row pb-10"}>
                        <ResponsiveContainer width={200} aspect={1}>
                          <PieChart>
                            <Tooltip />
                            <Legend verticalAlign={"bottom"} height={18} />
                            <Pie
                              data={pieChartData}
                              dataKey="total"
                              nameKey="housemate.name"
                              innerRadius={20}
                              outerRadius={40}
                              fill="#82ca9d"
                              label
                            >
                              {housemateTotalsWithRent.map((entry, index) => {
                                return (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={
                                      entry.housemate.id ===
                                      housemate.housemate.id
                                        ? "#8884d8"
                                        : "#8c918e"
                                    }
                                  />
                                );
                              })}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer width={200} aspect={1}>
                          <PieChart>
                            <Tooltip />
                            <Legend verticalAlign={"bottom"} height={18} />
                            <Pie
                              data={housemate.share}
                              nameKey="name"
                              dataKey="amount"
                              innerRadius={20}
                              outerRadius={40}
                            >
                              {housemateTotalsWithRent.map((entry, index) => {
                                return <Cell key={`cell-${index}`} />;
                              })}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <DataTable />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
