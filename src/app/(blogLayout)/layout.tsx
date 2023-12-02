import { Metadata } from "next";
import { ReactNode } from "react";
import { Ubuntu as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  variable: "--font-sans",
  weight: ["300"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Split My Rent",
  description: "Easy bill splitting for housemates, friends and partners.",
  other: {
    "google-adsense-account": "ca-pub-0957049115549750",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <section className={cn("p-4", fontSans.variable)}>{children}</section>;
}
