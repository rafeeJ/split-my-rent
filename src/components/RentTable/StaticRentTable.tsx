import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { THousemate } from "@/components/HousemateTable/Columns";

export const StaticRentTable = ({
  housemates,
  rentSplit,
}: {
  housemates: THousemate[];
  rentSplit: { [name: string]: number };
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Housemate</TableHead>
          <TableHead className={"text-right"}>Share</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {housemates.map((housemate) => (
          <TableRow key={housemate.id}>
            <TableCell>{housemate.name}</TableCell>
            <TableCell className={"text-right"}>
              {rentSplit[housemate.id].toLocaleString(undefined, {
                style: "currency",
                currency: "GBP",
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
