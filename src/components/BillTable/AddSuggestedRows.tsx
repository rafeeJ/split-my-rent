import { Button } from "@/components/ui/button";
import { HTMLAttributes } from "react";

interface IAddSuggestedRowsProps extends HTMLAttributes<HTMLButtonElement> {
  table: any;
}

export const AddSuggestedRows = ({
  table,
  ...props
}: IAddSuggestedRowsProps) => {
  const meta = table.options.meta;
  return (
    <Button
      {...props}
      variant={"outline"}
      onClick={() => meta?.addSuggestedRows()}
    >
      Add suggested rows
    </Button>
  );
};
