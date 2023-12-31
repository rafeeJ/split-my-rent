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
  billData: TBill[];
}

export const ResultsTable = ({
  housemateData,
  billData,
}: IResultsTableProps) => {
  const { currency } = useCurrencyContext();

  const calculateHousemateTotals = () => {
    const applicableBills = billData
      .map((bill) => {
        const applicableHousemates = bill.applicableHousemates.map((id) => {
          const housemate = housemateData.find((hm) => hm.id === id);
          if (!housemate) return;
          housemate.income = Number(housemate.income);
          return housemate;
        });
        return {
          ...bill,
          applicableHousemates,
        };
      })
      .map((bill) => {
        const applicableHousemates = bill.applicableHousemates.filter(
          (hm) => hm !== undefined,
        );
        return {
          ...bill,
          applicableHousemates,
        };
      });

    const housematePayments = applicableBills.map((bill) => {
      const totalApplicableIncome = bill.applicableHousemates.reduce(
        (acc, housemate) => {
          if (!housemate) return acc;
          return acc + housemate.income;
        },
        0,
      );

      const housematePayments = bill.applicableHousemates.map((housemate) => {
        if (!housemate) return;
        const proportion = bill.splitProportionally
          ? housemate.income / totalApplicableIncome
          : 1 / bill.applicableHousemates.length;
        const amount = bill.amount * proportion;

        const billName = bill.name;

        return {
          housemate,
          amount,
          billName,
        };
      });
      return housematePayments;
    });

    // for each housemate, find the bills they are applicable for and group them
    const splitBillsPerHousemate = housemateData.map((housemate) => {
      const bills = housematePayments.map((bill) => {
        const billForHousemate = bill.find((b) => {
          if (!b) return;
          return b.housemate.id === housemate.id;
        });
        return billForHousemate;
      });
      return {
        id: housemate.id,
        name: housemate.name,
        bills,
      };
    });

    return splitBillsPerHousemate;
  };

  const housemateTotals = calculateHousemateTotals();
  const sanitisedHousemateTotals = housemateTotals.map((housemate) => {
    const total = housemate.bills.reduce((acc, bill) => {
      if (!bill) return acc;
      return acc + bill.amount;
    }, 0);

    return {
      name: housemate.name,
      value: parseFloat(total.toFixed(2)),
    };
  });

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
            const total = housemate.bills.reduce((acc, bill) => {
              if (!bill) return acc;
              return acc + bill.amount;
            }, 0);

            const valueToDisplay = total.toLocaleString(undefined, {
              style: "currency",
              currency: currency,
            });

            const getRandomPurple = () => {
              const red = Math.floor(Math.random() * 256);
              const blue = Math.floor(Math.random() * 256);
              const green = 128;

              return `rgb(${red}, ${green}, ${blue})`;
            };

            const sanitisedBillSplit = housemate.bills.map((bill) => {
              const color = getRandomPurple();
              if (!bill) return;
              return {
                name: bill.billName,
                value: parseFloat(bill.amount.toFixed(2)),
                color,
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
                    {sanitisedBillSplit.map((bill, idx) => {
                      if (!bill) return;

                      const color = bill.color;
                      console.log(color);
                      return (
                        <TableRow key={idx}>
                          <TableCell style={{ color }}>
                            <Badge
                              style={{ backgroundColor: color }}
                              className={"mr-2"}
                            >
                              {bill.name}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {bill.value.toLocaleString(undefined, {
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
                <TableCell>{housemate.name}</TableCell>
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
                      <div className={"flex flex-row"}>
                        <ResponsiveContainer width={200} aspect={1}>
                          <PieChart>
                            <Tooltip />
                            <Legend verticalAlign={"bottom"} height={18} />

                            <Pie
                              data={sanitisedHousemateTotals}
                              dataKey="value"
                              nameKey="name"
                              innerRadius={20}
                              outerRadius={40}
                              fill="#82ca9d"
                              label
                            >
                              {sanitisedHousemateTotals.map((entry, index) => {
                                return (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={
                                      entry.name === housemate.name
                                        ? "#8884d8"
                                        : "#6a6a73"
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
                              dataKey="value"
                              data={sanitisedBillSplit}
                              nameKey="name"
                              innerRadius={20}
                              outerRadius={40}
                            >
                              {sanitisedBillSplit.map((entry, index) => {
                                if (!entry) return;
                                return (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                  />
                                );
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
