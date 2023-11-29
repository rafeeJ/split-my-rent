"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import {
  columns as HousemateColumns,
  THousemate,
} from "@/components/HousemateTable/columns";
import { HouseMateTable } from "@/components/HousemateTable/HouseMateTable";
import { columns as BillColumns, TBill } from "@/components/BillTable/Columns";
import { BillTable } from "@/components/BillTable/BillTable";

export default function Home() {
  const [housemates] = useState<THousemate[]>([
    { name: "John", income: 500 },
    { name: "Jane", income: 1000 },
  ]);

  const [bills] = useState<TBill[]>([
    {
      name: "Rent",
      amount: 1000,
    },
    {
      name: "Water",
      amount: 50,
    },
    {
      name: "Electricity",
      amount: 100,
    },
    {
      name: "Internet",
      amount: 50,
    },
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className={"w-full"}>
        <CardHeader>
          <CardTitle>Add housemates</CardTitle>
          <CardDescription>Monthly incomes too</CardDescription>
        </CardHeader>
        <CardContent>
          <HouseMateTable columns={HousemateColumns} propData={housemates} />
        </CardContent>
      </Card>

      <Card className={"w-full"}>
        <CardHeader>
          <CardTitle>Add Bills</CardTitle>
          <CardDescription>By the month!</CardDescription>
        </CardHeader>
        <CardContent>
          <BillTable columns={BillColumns} propData={bills} />
        </CardContent>
      </Card>
    </main>
  );
}
