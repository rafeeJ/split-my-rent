import { Button } from "@/components/ui/button";
import { CrossIcon } from "lucide-react";

export const DeleteBillButton = ({ row, table }: any) => {
  const meta = table.options.meta;

  const removeRow = () => {
    meta?.removeRow(row.index);
  };

  return (
    <Button variant={"destructive"} onClick={removeRow} size={"icon"}>
      <CrossIcon size={15} className={"rotate-45"} />
    </Button>
  );
};
