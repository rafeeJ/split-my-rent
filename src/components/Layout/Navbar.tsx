"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={"flex flex-row items-center bg-secondary px-10"}>
      <h1 className={"text-2xl p-2"}>💸 Split My Rent</h1>
      <div className={"grow"} />
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
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
