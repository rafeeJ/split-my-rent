import type { Metadata } from "next";
import { Ubuntu as FontSans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Layout/Navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"system"}
          enableSystem
          disableTransitionOnChange
        >
          <CurrencyProvider>
            <Navbar />
            {children}
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
