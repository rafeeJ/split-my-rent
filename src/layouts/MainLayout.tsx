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
import { useUserInformationContext } from "@/contexts/UserInformationContext";
import { RentTable } from "@/components/RentTable/RentTable";

export const HomeLayout = ({
  housematesFromUrl,
  billsFromUrl,
}: {
  housematesFromUrl?: THousemate[];
  billsFromUrl?: TBill[];
}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const { housemates, bills, setBills, setHousemates } =
    useUserInformationContext();

  useEffect(() => {
    if (housematesFromUrl) {
      setHousemates(housematesFromUrl);
    }
    if (billsFromUrl) {
      setBills(billsFromUrl);
    }
  }, [housematesFromUrl, billsFromUrl]);

  const [shareableUrlState, setShareableUrlState] = useState("");

  useEffect(() => {
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

      <div className={"flex flex-col md:grid md:grid-cols-4 md:gap-8 gap-2"}>
        <section className={"w-full col-start-2 col-end-4"}>
          <div className={"p-2"}>
            <h1 className={"text-xl"}>Add your housemates</h1>
            <h3 className={"text-md"}>Gross monthly income</h3>
          </div>
          <HouseMateTable
            columns={HousemateColumns}
            data={housemates}
            setData={setHousemates}
          />
        </section>

        <section className={"w-full col-span-2"}>
          <div className={"p-2"}>
            <h1 className={"text-xl"}>Monthly Rent</h1>
            <h3 className={"text-md"}>and choose your split</h3>
          </div>
          <RentTable />
        </section>

        <section className={"w-full col-span-2"}>
          <div className={"p-2"}>
            <h1 className={"text-xl"}>Add monthly Bills</h1>
            <h3 className={"text-md"}>and choose how you want to split them</h3>
          </div>

          <BillTable
            columns={BillColumns}
            data={bills}
            setData={setBills}
            housemates={housemates}
          />
        </section>

        <Separator className={"md:hidden"} />

        <section className={"w-full col-span-3"}>
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
