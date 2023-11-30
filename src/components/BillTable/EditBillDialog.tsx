import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PencilIcon } from "lucide-react";
import { FilterHousemates } from "@/components/BillTable/FilterHousemates";
import { ApplicableHousemateList } from "@/components/BillTable/ApplicableHousemateList";
import { Switch } from "@/components/ui/switch";

export const EditBillDialog = ({ table, row, getValue }: any) => {
  const meta = table.options.meta;
  const splitProportionally = row.getValue("splitProportionally");
  const handleToggleProportional = () => {
    meta?.updateData(row.index, "splitProportionally", !splitProportionally);
  };

  const handleDelete = () => {
    meta?.removeRow(row.index);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <PencilIcon size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Bill</DialogTitle>
          <DialogDescription>
            Make changes to the bill and click save.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-2">
              Applicable Housemates
            </Label>
            <ApplicableHousemateList table={table} row={row} />
            <FilterHousemates table={table} row={row} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right col-span-2">
              Split Proportionally?
            </Label>
            <Switch
              className={"col-start-3"}
              checked={splitProportionally}
              onCheckedChange={handleToggleProportional}
            />
          </div>
        </div>
        <DialogFooter className={"gap-2"}>
          <Button variant={"destructive"} onClick={handleDelete}>
            Delete
          </Button>
          <DialogClose asChild>
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
