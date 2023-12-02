"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { getRightmoveData } from "@/actions";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const RightmoveForm = ({
  monthlyRent,
  setMonthlyRent,
}: {
  monthlyRent: number;
  setMonthlyRent: Dispatch<SetStateAction<number>>;
}) => {
  const [state, formAction] = useFormState(getRightmoveData, {
    message: "",
    property: "",
  });

  useEffect(() => {
    if (state.property) {
      const price = state.property.price.replace(/[^0-9]/g, "");
      setMonthlyRent(Number(price));
      console.error(state.property);
    }
  }, [state.property]);

  const handleChange = (e: any) => {
    setMonthlyRent(Number(e.target.value));
  };

  return (
    <Tabs defaultValue="manual">
      <TabsList>
        <TabsTrigger value="manual">Manual</TabsTrigger>
        <TabsTrigger value="rightmove">Rightmove</TabsTrigger>
      </TabsList>
      <TabsContent value="manual">
        <Card>
          <CardHeader>
            <CardTitle>Enter a monthly rent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={"grid gap-2"}>
              <Label>Monthly Rent</Label>
              <Input
                type={"number"}
                placeholder="£2,350"
                name={"price"}
                value={monthlyRent}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="rightmove">
        <form className={"space-y-2"} action={formAction}>
          <Card>
            <CardHeader>
              <CardTitle>Enter a Rightmove URL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={"grid gap-2"}>
                <Label>Rightmove URL</Label>
                <Input
                  placeholder="https://www.rightmove.co.uk/properties/108127939#/"
                  name={"url"}
                />
              </div>
              {state.property && (
                <p className={"py-2"}>
                  Rent data for: {state.property.address}
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button type={"submit"}>Submit</Button>
              {state.message}
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
    </Tabs>
  );
};
