"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useUserInformationContext } from "@/contexts/UserInformationContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { RentDistributionTable } from "@/components/RentTable/RentDistributionTable";
import { TDistribution } from "@/types/types";

export const RentTable = () => {
  const { rent, setRent, rentDistribution, setRentDistribution, housemates } =
    useUserInformationContext();

  const handleChange = (e: any) => {
    setRent(e.target.value);
  };

  const handleRadioChange = (value: string) => {
    if (
      value === "custom" ||
      value === "proportionally" ||
      value === "equally"
    ) {
      setRentDistribution(value as TDistribution);
    }
  };

  const typeDescriptions = {
    equally: "The rent is split equally between all housemates.",
    proportionally:
      "The rent is split proportionally based on the size of income.",
    custom: "The rent is split based on your custom input.",
  };

  return (
    <div className={"border p-2"}>
      <div className={"grid gap-2"}>
        <div className={"grid gap-2"}>
          <Label>Monthly Rent</Label>
          <Input
            min={0}
            type={"number"}
            placeholder="£2,350"
            name={"price"}
            value={rent}
            onChange={handleChange}
          />
        </div>
        <div className={"flex flex-col gap-2"}>
          <Label>How do you want to split Rent?</Label>
          <div className={"flex flex-row justify-between"}>
            <div className={"grid gap-2"}>
              <RadioGroup
                defaultValue={rentDistribution}
                onValueChange={handleRadioChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="equally" id="equally" />
                  <Label htmlFor="equally">Equally</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="proportionally" id="proportionally" />
                  <Label htmlFor="proportionally">Proportionally</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">Custom</Label>
                </div>
              </RadioGroup>
            </div>
            <div className={"w-1/2"} />
            <div className={"flex text-center items-center justify-center"}>
              <p>{typeDescriptions[rentDistribution]}</p>
            </div>
          </div>
        </div>
        <RentDistributionTable distributionMethod={rentDistribution} />
      </div>
    </div>
  );
};
