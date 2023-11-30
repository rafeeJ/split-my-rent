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
import { set } from "zod";

export default function Home() {
  const [housemates] = useState<THousemate[]>([
    { name: "John", income: 500 },
    { name: "Jane", income: 1000 },
  ]);

  const [bills, setBills] = useState<TBill[]>([
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
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 gap-y-2">
      <h1 className={"text-3xl"}>Split My Rent</h1>
      <h3 className={"text-2xl"}>A simple rent splitting app</h3>
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
          <BillTable columns={BillColumns} data={bills} setData={setBills} />
        </CardContent>
      </Card>
    </main>
  );
}
