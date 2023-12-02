import { HomeLayout } from "@/layouts/MainLayout";

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
