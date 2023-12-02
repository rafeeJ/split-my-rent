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

// try {
//   const response = await fetch(propertyUrlAsString, {
//     method: "GET",
//     headers: {
//       "Content-Type": "text/html",
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Headers": "*",
//       "Access-Control-Allow-Methods": "*",
//       "user-agent":
//         "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
//       "no-cors": "true",
//     },
//   });
//   const data = await response.json();
//
//   console.log(data);
//
//   return data;
// } catch (error) {
//   return { message: "Error fetching data" };
// }
// };
