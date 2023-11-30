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
import { Info, ViewIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface IResultsTableProps {
  housemateData: THousemate[];
  billData: TBill[];
}

export const ResultsTable = ({
  housemateData,
  billData,
}: IResultsTableProps) => {
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
              currency: "GBP",
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
                    {housemate.bills.map((bill, idx) => {
                      if (!bill) return;
                      return (
                        <TableRow key={idx}>
                          <TableCell>{bill.billName}</TableCell>
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
                <TableCell>{housemate.name}</TableCell>
                <TableCell className={"text-right"}>
                  <Dialog>
                    <DialogTrigger className={"font-bold underline"}>
                      <Button className={"gap-2"} variant={"outline"}>
                        {valueToDisplay}
                        <Info />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
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
