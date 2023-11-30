import { THousemate } from "@/components/HousemateTable/columns";
import { TBill } from "@/components/BillTable/Columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface IResultsTableProps {
  housemateData: THousemate[];
  billData: TBill[];
}

export const ResultsTable = ({
  housemateData,
  billData,
}: IResultsTableProps) => {
  const calculateHousemateTotals = () => {
    // For each bill, we need to work out what proportion of the total bill each housemate should pay based on their income and whether they are applicable to the bill.

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

    // if a bill has an applicable housemate that doesn't exist, then we should ignore it.

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
        const proportion = housemate.income / totalApplicableIncome;
        const amount = bill.amount * proportion;
        return {
          housemate,
          amount,
        };
      });
      return housematePayments;
    });

    const housemateTotals = housemateData.map((housemate) => {
      const bills = housematePayments.map((bill) => {
        const housemateBill = bill.find((bill) => {
          if (!bill) return;
          return bill.housemate.id === housemate.id;
        });
        return housemateBill?.amount || 0;
      });
      const total = bills.reduce((acc, bill) => acc + bill, 0);
      return {
        name: housemate.name,
        shareOfBills: total,
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
            <TableHead>Share of bills</TableHead>
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
          {housemateTotals.map((housemate, idx) => (
            <TableRow key={idx}>
              <TableCell>{housemate.name}</TableCell>
              <TableCell>
                {housemate.shareOfBills.toLocaleString(undefined, {
                  style: "currency",
                  currency: "GBP",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
