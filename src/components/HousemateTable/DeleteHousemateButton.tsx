import { Button } from "@/components/ui/button";
import { DeleteIcon } from "lucide-react";

export const DeleteHousemateButton = ({ row, table }: any) => {
  const meta = table.options.meta;

  const removeRow = () => {
    meta?.removeRow(row.index);
  };

  return (
    <Button variant={"secondary"} onClick={removeRow}>
      <DeleteIcon />
    </Button>
  );
};
