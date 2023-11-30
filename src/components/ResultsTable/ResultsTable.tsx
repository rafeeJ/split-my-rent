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
    // total income
    const totalIncome = housemateData.reduce((acc, housemate) => {
      return acc + housemate.income;
    }, 0);

    const housemateWithProportions = housemateData.map((housemate) => {
      const proportion = (housemate.income / totalIncome) * 100;
      return {
        ...housemate,
        proportion,
      };
    });

    const totalBills = billData.reduce((acc, bill) => {
      return acc + bill.amount;
    }, 0);

    const housemateWithProportionalBills = housemateWithProportions.map(
      (housemate) => {
        const shareOfBills = (housemate.proportion / 100) * totalBills;
        return {
          ...housemate,
          shareOfBills,
        };
      },
    );

    return housemateWithProportionalBills;
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
