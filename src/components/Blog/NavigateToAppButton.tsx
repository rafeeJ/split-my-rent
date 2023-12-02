"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NavigateToAppButton({ text }: { text: string }) {
  const router = useRouter();

  return (
    <Button className="px-4 py-2 w-full" onClick={() => router.push("/")}>
      {text}
    </Button>
  );
}
