import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { Table } from "@tanstack/table-core";

export const AddRowButton = ({ table }: any) => {
  const meta = table.options.meta;
  return (
    <Button variant={"outline"} onClick={() => meta?.addRow()}>
      Add row
    </Button>
  );
};
