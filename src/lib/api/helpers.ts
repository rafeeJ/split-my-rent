import { cookies, headers } from "next/headers";

export const getBaseUrl = () => {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const fullUrl = `${protocol}://${host}`;
  return fullUrl;
};
