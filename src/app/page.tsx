"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  columns as HousemateColumns,
  THousemate,
} from "@/components/HousemateTable/columns";
import { HouseMateTable } from "@/components/HousemateTable/HouseMateTable";
import { columns as BillColumns, TBill } from "@/components/BillTable/Columns";
import { BillTable } from "@/components/BillTable/BillTable";
import { set } from "zod";
import { ResultsTable } from "@/components/ResultsTable/ResultsTable";

export default function Home() {
  const [housemates, setHousemates] = useState<THousemate[]>([
    { id: 0, name: "John", income: 500 },
    { id: 1, name: "Jane", income: 1000 },
  ]);

  const [bills, setBills] = useState<TBill[]>([
    {
      id: 0,
      name: "Rent",
      amount: 1000,
      applicableHousemates: [0, 1],
    },
    {
      id: 1,
      name: "Water",
      amount: 50,
      applicableHousemates: [0, 1],
    },
    {
      id: 2,
      name: "Electricity",
      amount: 100,
      applicableHousemates: [0, 1],
    },
    {
      id: 3,
      name: "Internet",
      amount: 50,
      applicableHousemates: [0, 1],
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
          <HouseMateTable
            columns={HousemateColumns}
            data={housemates}
            setData={setHousemates}
          />
        </CardContent>
      </Card>

      <Card className={"w-full"}>
        <CardHeader>
          <CardTitle>Add Bills</CardTitle>
          <CardDescription>By the month!</CardDescription>
        </CardHeader>
        <CardContent>
          <BillTable
            columns={BillColumns}
            data={bills}
            setData={setBills}
            housemates={housemates}
          />
        </CardContent>
      </Card>

      <Card className={"w-full"}>
        <CardHeader>
          <CardTitle>Results</CardTitle>
          <CardDescription>See the results here!</CardDescription>
        </CardHeader>
        <CardContent>
          <ResultsTable housemateData={housemates} billData={bills} />
        </CardContent>
      </Card>
    </main>
  );
}
