import { HomeLayout } from "@/layouts/MainLayout";
import { Metadata } from "next";

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

export default function Home({
  searchParams,
}: {
  searchParams: { housemates: string; bills: string };
}) {
  const housematesFromUrl =
    searchParams.housemates && JSON.parse(searchParams.housemates);
  const billsFromUrl = searchParams.bills && JSON.parse(searchParams.bills);

  return (
    <HomeLayout
      housematesFromUrl={housematesFromUrl}
      billsFromUrl={billsFromUrl}
    />
  );
}
