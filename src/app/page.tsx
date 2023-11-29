"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { columns, THousemate } from "@/components/HousemateTable/columns";
import { HouseMateTable } from "@/components/HousemateTable/HouseMateTable";

export default function Home() {
  const [housemates, setHousemates] = useState<THousemate[]>([
    { name: "John", income: 500 },
    { name: "Jane", income: 1000 },
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card>
        <CardHeader>
          <CardTitle>Add housemates</CardTitle>
          <CardDescription>Monthly incomes too</CardDescription>
        </CardHeader>
        <CardContent>
          <HouseMateTable columns={columns} propData={housemates} />
        </CardContent>
      </Card>
    </main>
  );
}
