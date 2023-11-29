import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { Table } from "@tanstack/table-core";

export const AddHousemateButton = ({ table }: { table: Table<any> }) => {
  const meta = table.options.meta;
  // @ts-ignore
  return <Button onClick={() => meta?.addRow()}>Add row</Button>;
};
