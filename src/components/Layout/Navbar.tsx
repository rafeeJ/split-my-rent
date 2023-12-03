"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, MenuIcon, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useCurrencyContext } from "@/contexts/CurrencyContext";
import { TCurrency } from "@/types/types";
import Link from "next/link";
import { useUserInformationContext } from "@/contexts/UserInformationContext";
import { defaultBills, defaultHousemates } from "@/lib/localstorage";
import { FeedbackForm } from "@/components/Layout/FeedbackForm";

export const Navbar = () => {
  const { setBills, setHousemates } = useUserInformationContext();
  const handleReset = () => {
    setBills(defaultBills);
    setHousemates(defaultHousemates);
  };

  const { theme, setTheme } = useTheme();
  const { currency, setCurrency, availableCurrencies } = useCurrencyContext();

  const [position, setPosition] = useState(theme || "system");

  useEffect(() => {
    if (position === "system") {
      setTheme("system");
    } else {
      setTheme(position);
    }
  }, [position]);

  const handleChangeCurrency = (currency: string) => {
    setCurrency(currency as TCurrency);
  };

  return (
    <div className={"flex flex-row items-center bg-secondary md:px-10"}>
      <Link href={"/"} passHref>
        <h1 className={"text-2xl p-2"}>💸 Split My Rent</h1>
      </Link>
      <div className={"grow"} />
      <Link href={"/blog"} passHref className={"underline"}>
        <Button variant={"ghost"} className={"btn btn-primary underline"}>
          Blog
        </Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className={"btn btn-primary"}>
            {currency}
            <ChevronDownIcon size={15} className={"ml-1"} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Currencies</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Display</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={currency}
              onValueChange={handleChangeCurrency}
            >
              {availableCurrencies.map((currency) => (
                <DropdownMenuRadioItem value={currency} key={currency}>
                  {currency}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className={"btn btn-primary"}>
            <SettingsIcon size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleReset}>
              Reset local data 🔄
            </DropdownMenuItem>
            <DropdownMenuLabel>Display</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="system">
                System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <FeedbackForm />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
