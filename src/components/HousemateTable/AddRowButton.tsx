import { Button } from "@/components/ui/button";
import { HTMLAttributes } from "react";

interface IAddRowButtonProps extends HTMLAttributes<HTMLButtonElement> {
  table: any;
}

export const AddRowButton = ({ table, ...props }: IAddRowButtonProps) => {
  const meta = table.options.meta;

  return (
    <Button {...props} variant={"outline"} onClick={() => meta?.addRow()}>
      Add row
    </Button>
  );
};
