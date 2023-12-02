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
import { MenuIcon, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useCurrencyContext } from "@/contexts/CurrencyContext";
import { TCurrency } from "@/types/types";

export const Navbar = () => {
  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
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
    <div className={"flex flex-row items-center bg-secondary px-10"}>
      <h1 className={"text-2xl p-2"}>💸 Split My Rent</h1>
      <div className={"grow"} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className={"btn btn-primary"}>
            {currency}
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
            <SettingsIcon />
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
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
