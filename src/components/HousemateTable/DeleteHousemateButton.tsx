import { Button } from "@/components/ui/button";
import { DeleteIcon } from "lucide-react";

export const DeleteHousemateButton = ({ row, table }: any) => {
  const meta = table.options.meta;

  const removeRow = () => {
    meta?.removeRow(row.index);
  };

  const disabled = table.getRowModel().rows.length === 1;

  return (
    <Button
      variant={"destructive"}
      onClick={removeRow}
      size={"icon"}
      disabled={disabled}
    >
      <DeleteIcon size={15} />
    </Button>
  );
};
