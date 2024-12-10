import type { Metadata } from "next";
import { Open_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Layout/Navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { UserInformationProvider } from "@/contexts/UserInformationContext";

const fontSans = FontSans({
  variable: "--font-sans",
  weight: ["300"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Split My Rent",
  description:
    "Split rent and bills with housemates, friends and partners - the easy way.",

  openGraph: {
    title: "Split My Rent",
    description:
      "Split rent and bills with housemates, friends and partners - the easy way.",
    type: "website",
  },
  other: {
    "google-adsense-account": "ca-pub-0957049115549750",
  },
  alternates: {
    canonical: "https://splitmyrent.com",
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
          <UserInformationProvider>
            <CurrencyProvider>
              <Navbar />
              {children}
            </CurrencyProvider>
          </UserInformationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
