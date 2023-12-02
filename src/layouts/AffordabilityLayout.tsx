"use client";
import { HouseMateTable } from "@/components/HousemateTable/HouseMateTable";
import { useUserInformationContext } from "@/contexts/UserInformationContext";
import {
  columns as HousemateColumns,
  columns,
} from "@/components/HousemateTable/Columns";
import { RightmoveForm } from "@/components/Affordability/RightmoveForm";
import { useState } from "react";
import { AffordabilityTable } from "@/components/Affordability/AffordabilityTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const AffordabilityLayout = () => {
  const { housemates, setHousemates } = useUserInformationContext();
  const [monthlyRent, setMonthlyRent] = useState(0);
  const [splitEvenly, setSplitEvenly] = useState(false);

  return (
    <main className="min-h-screen items-center justify-between p-4 md:p-10 gap-y-2">
      <section className={"flex flex-col p-2 md:text-center"}>
        <h1 className={"text-2xl"}>Monthly Rent Calculator</h1>
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
        <div>
          <div className={"p-2"}>
            <h1 className={"text-xl"}>Monthly Rent</h1>
            <h3 className={"text-md"}>Add your rent here</h3>
          </div>
          <RightmoveForm
            setMonthlyRent={setMonthlyRent}
            monthlyRent={monthlyRent}
          />
        </div>

        <section className={"col-span-2"}>
          <Card>
            <CardHeader>
              <div className={"flex flex-row"}>
                <div>
                  <CardTitle>Results</CardTitle>
                  <CardDescription>See the results here!</CardDescription>
                </div>
                <div className={"flex-grow"} />
                <div className={"flex items-center justify-center gap-2"}>
                  <Label>Split Evenly</Label>
                  <Switch
                    checked={splitEvenly}
                    onCheckedChange={() => setSplitEvenly(!splitEvenly)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <AffordabilityTable
                housemateData={housemates}
                rent={monthlyRent}
                splitEvenly={splitEvenly}
              />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};
