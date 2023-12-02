"use client";
import { useEffect, useState } from "react";
import {
  columns as HousemateColumns,
  THousemate,
} from "@/components/HousemateTable/Columns";
import { defaultBills, defaultHousemates } from "@/lib/localstorage";
import { columns as BillColumns, TBill } from "@/components/BillTable/Columns";
import { HouseMateTable } from "@/components/HousemateTable/HouseMateTable";
import { BillTable } from "@/components/BillTable/BillTable";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResultsTable } from "@/components/ResultsTable/ResultsTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const HomeLayout = ({
  housematesFromUrl,
  billsFromUrl,
}: {
  housematesFromUrl?: THousemate[];
  billsFromUrl?: TBill[];
}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const [shareableUrlState, setShareableUrlState] = useState("");
  const [housemates, setHousemates] = useState<THousemate[]>(() => {
    if (housematesFromUrl) {
      return housematesFromUrl;
    }

    const housematesFromStorage = localStorage.getItem("housemates");
    if (!housematesFromStorage) return defaultHousemates;
    return JSON.parse(housematesFromStorage);
  });
  const [bills, setBills] = useState<TBill[]>(() => {
    if (billsFromUrl) {
      return billsFromUrl;
    }

    const billsFromStorage = localStorage.getItem("bills");
    if (!billsFromStorage) return defaultBills;
    return JSON.parse(billsFromStorage);
  });

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

  if (!isClient) return null;

  return (
    <main className="min-h-screen items-center justify-between p-4 md:p-10 gap-y-2">
      <section className={"flex flex-col p-2 md:text-center"}>
        <h1 className={"text-2xl"}>Split based on your housemates incomes!</h1>
      </section>

      <div className={"flex flex-col md:grid md:grid-cols-2 md:gap-8 gap-2"}>
        <section className={"w-full"}>
          <div className={"p-2"}>
            <h1 className={"text-xl"}>Incomes</h1>
            <h3 className={"text-md"}>Add your housemates here!</h3>
          </div>
          <HouseMateTable
            columns={HousemateColumns}
            data={housemates}
            setData={setHousemates}
          />
        </section>
        <section className={"w-full"}>
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
        </section>

        <Separator className={"md:hidden"} />

        <section className={"w-full"}>
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>See the results here!</CardDescription>
            </CardHeader>
            <CardContent>
              <ResultsTable housemateData={housemates} billData={bills} />
            </CardContent>
          </Card>
        </section>

        <section className={"w-full"}>
          <Card>
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
        </section>
      </div>
    </main>
  );
};
