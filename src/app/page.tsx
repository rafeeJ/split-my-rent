"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  columns as HousemateColumns,
  THousemate,
} from "@/components/HousemateTable/Columns";
import { HouseMateTable } from "@/components/HousemateTable/HouseMateTable";
import { columns as BillColumns, TBill } from "@/components/BillTable/Columns";
import { BillTable } from "@/components/BillTable/BillTable";
import { ResultsTable } from "@/components/ResultsTable/ResultsTable";
import { Separator } from "@/components/ui/separator";
import { defaultBills, defaultHousemates } from "@/lib/localstorage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Home({
  searchParams,
}: {
  searchParams: { housemates: string; bills: string };
}) {
  const isServer = typeof window === "undefined";

  const [shareableUrlState, setShareableUrlState] = useState("");
  const [housemates, setHousemates] = useState<THousemate[]>(() => {
    if (isServer) return [];

    if (searchParams.housemates) {
      const housemates = JSON.parse(searchParams.housemates);
      return housemates;
    }

    const housemates = localStorage.getItem("housemates");
    if (!housemates) return defaultHousemates;
    return JSON.parse(housemates);
  });
  const [bills, setBills] = useState<TBill[]>(() => {
    if (isServer) return [];

    if (searchParams.bills) {
      const bills = JSON.parse(searchParams.bills);
      return bills;
    }

    const bills = localStorage.getItem("bills");
    if (!bills) return defaultBills;
    return JSON.parse(bills);
  });
  const [useProportions, setUseProportions] = useState(true);

  useEffect(() => {
    // when there is a change, store the data in local storage
    localStorage.setItem("housemates", JSON.stringify(housemates));
    localStorage.setItem("bills", JSON.stringify(bills));

    const shareableSearchParam = `?housemates=${encodeURIComponent(
      JSON.stringify(housemates),
    )}&bills=${encodeURIComponent(JSON.stringify(bills))}`;
    const shareableUrl = `${window.location.origin}${shareableSearchParam}`;
    setShareableUrlState(shareableUrl);
  }, [housemates, bills]);

  return (
    <main className="min-h-screen items-center justify-between p-4 md:p-10 gap-y-2">
      <div className={"flex flex-col p-2 md:text-center"}>
        <h3 className={"text-2xl"}>Split based on your housemates incomes!</h3>
      </div>

      <div className={"flex flex-col md:grid md:grid-cols-2 md:gap-8 gap-2"}>
        <div className={"w-full"}>
          <div className={"p-2"}>
            <h1 className={"text-xl"}>Incomes</h1>
            <h3 className={"text-md"}>Add your housemates here!</h3>
          </div>
          <HouseMateTable
            columns={HousemateColumns}
            data={housemates}
            setData={setHousemates}
          />
        </div>

        <div className={"w-full"}>
          <div className={"p-2"}>
            <h1 className={"text-xl"}>Add Bills</h1>
            <h3 className={"text-md"}>By the month!</h3>
          </div>

          <BillTable
            columns={BillColumns}
            data={bills}
            setData={setBills}
            housemates={housemates}
          />
        </div>

        <Separator className={"md:hidden"} />

        <Card className={"w-full md:col-span-2"}>
          <CardHeader className={"flex flex-row items-center justify-center"}>
            <div>
              <CardTitle>Results</CardTitle>
              <CardDescription>See the results here!</CardDescription>
            </div>
            <div className={"flex-grow"} />
            <div className={"flex items-center justify-center flex-col gap-1"}>
              <Label>Equal Split?</Label>
              <Switch
                checked={!useProportions}
                onCheckedChange={() => setUseProportions((old) => !old)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <ResultsTable
              housemateData={housemates}
              billData={bills}
              useProportions={useProportions}
            />
          </CardContent>
        </Card>

        <Card className={"w-full md:col-span-2"}>
          <CardHeader>
            <CardTitle>Share with housemates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={"grid gap-2"}>
              <Input value={shareableUrlState} readOnly={true} />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(shareableUrlState);
              }}
            >
              share
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
