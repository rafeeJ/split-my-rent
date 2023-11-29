import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { THousemate } from "@/components/HousemateTable/columns";

interface IHouseMateRowProps extends HTMLAttributes<HTMLDivElement> {
  housemate: THousemate;
  idx: number;
  onDelete: ({ idx }: { idx: number }) => void;
}

export const HouseMateRow = ({
  housemate,
  idx,
  onDelete,
  ...rest
}: IHouseMateRowProps) => {
  return (
    <div key={idx} className={cn("flex flex-row gap-2 mb-2", rest)}>
      <Input value={housemate.name} />
      <Input
        value={housemate.income.toLocaleString(undefined, {
          maximumFractionDigits: 0,
          style: "currency",
          currency: "GBP",
        })}
      />
      <Button onClick={() => onDelete({ idx })}>Delete</Button>
    </div>
  );
};
