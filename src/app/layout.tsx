import type { Metadata } from "next";
import { Ubuntu as FontSans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Layout/Navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";

const fontSans = FontSans({
  variable: "--font-sans",
  weight: ["300"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Split My Rent",
  description: "Easy bill splitting for housemates",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
