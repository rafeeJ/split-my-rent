import { THousemate } from "@/components/HousemateTable/Columns";
import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { TBill } from "@/components/BillTable/Columns";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserInformationContext } from "@/contexts/UserInformationContext";
import { Input } from "@/components/ui/input";

export const CustomRentTable = () => {
  const {
    rentDistribution,
    setCustomRentSplit,
    housemates,
    customRentSplit,
    rentSplit,
  } = useUserInformationContext();

  useEffect(() => {
    const initialRentSplit = housemates.reduce((acc, housemate) => {
      return {
        ...acc,
        [housemate.name]: rentSplit[housemate.name],
      };
    }, {});

    console.log(initialRentSplit);

    setCustomRentSplit(initialRentSplit);
  }, [rentDistribution, housemates]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCustomRentSplit((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

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
              <Input
                min={0}
                type={"number"}
                placeholder="£2,350"
                name={housemate.name}
                value={customRentSplit[housemate.name]}
                onChange={handleChange}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
