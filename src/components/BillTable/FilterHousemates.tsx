"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THousemate } from "@/components/HousemateTable/Columns";
import { FilterIcon } from "lucide-react";

export function FilterHousemates({ table, row }: any) {
  const meta = table.options.meta;
  const applicableHousemates = row.getValue("applicableHousemates");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <FilterIcon size={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Housemates</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {meta?.housemates.map((housemate: THousemate, idx: number) => {
          return (
            <DropdownMenuCheckboxItem
              key={idx}
              checked={applicableHousemates.includes(housemate.id)}
              onCheckedChange={(checked) => {
                if (checked) {
                  meta?.updateData(row.index, "applicableHousemates", [
                    ...applicableHousemates,
                    housemate.id,
                  ]);
                } else {
                  if (applicableHousemates.length === 1) {
                    return;
                  }
                  meta?.updateData(
                    row.index,
                    "applicableHousemates",
                    applicableHousemates.filter(
                      (id: number) => id !== housemate.id,
                    ),
                  );
                }
              }}
            >
              {housemate.name}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
