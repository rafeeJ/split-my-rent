import { Badge } from "@/components/ui/badge";
import { FilterHousemates } from "@/components/BillTable/FilterHousemates";

export const ApplicableHousemateList = ({ table, row, getValue }: any) => {
  const meta = table.options.meta;
  const applicableHousemates = row.getValue("applicableHousemates");

  const isEveryoneApplicable =
    applicableHousemates.length === meta?.housemates.length;

  return (
    <div className="flex flex-wrap">
      {isEveryoneApplicable ? (
        <Badge>Everyone</Badge>
      ) : (
        applicableHousemates.map((id: number, idx: number) => {
          const housemate = meta?.housemates.find((hm: any) => hm.id === id);
          if (!housemate) return;
          return (
            <Badge variant={"secondary"} key={idx} className="mr-2 my-0.5">
              {housemate.name}
            </Badge>
          );
        })
      )}
    </div>
  );
};
