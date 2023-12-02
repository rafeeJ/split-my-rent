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

export const RightmoveForm = () => {
  const [state, formAction] = useFormState(getRightmoveData, {
    message: "",
    property: "",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter a Rightmove URL</CardTitle>
      </CardHeader>
      <CardContent>
        <form className={"space-y-2"} action={formAction}>
          <div className={"grid gap-2"}>
            <Label>Rightmove URL</Label>
            <Input
              placeholder="https://www.rightmove.co.uk/properties/108127939#/"
              name={"url"}
            />
          </div>
          <Button type={"submit"}>Submit</Button>
        </form>

        {state.property && (
          <div className={"grid gap-2"}>
            <Label>Property</Label>
            {JSON.stringify(state.property)}
          </div>
        )}
      </CardContent>
      <CardFooter>{state.message}</CardFooter>
    </Card>
  );
};
