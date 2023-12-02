"use server";
import { getBaseUrl } from "@/lib/api/helpers";

export const getRightmoveData = async (prevState: any, formData: FormData) => {
  const propertyURL = formData.get("url");
  if (!propertyURL) {
    return { message: "No URL provided." };
  }

  const searchParams = new URLSearchParams({ url: propertyURL as string });

  const res = await fetch(`${getBaseUrl()}/api/property?${searchParams}`, {
    method: "GET",
  });

  if (res.status === 401) {
    return { message: "Not a rental property" };
  }

  if (res.status !== 200) {
    return { message: "Error fetching data" };
  }

  const { property } = await res.json();

  return { message: "Success", property };
};
