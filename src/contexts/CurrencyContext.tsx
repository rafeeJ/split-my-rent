"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { TCurrency } from "@/types/types";

interface ICurrencyContextType {
  currency: TCurrency;
  setCurrency: (currency: TCurrency) => void;
  availableCurrencies: TCurrency[];
}

const CurrencyContext = createContext<ICurrencyContextType>({
  currency: "GBP",
  setCurrency: () => {},
  availableCurrencies: ["GBP", "USD", "EUR", "CAD", "AUD", "JPY", "CNY"],
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const isServer = typeof window === "undefined";

  const [currency, setCurrency] = useState<TCurrency>(() => {
    if (isServer) return "GBP";
    const currencyFromLocalStorage = localStorage.getItem("currency");
    if (currencyFromLocalStorage) {
      return JSON.parse(currencyFromLocalStorage);
    }
    return "GBP";
  });

  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(currency));
  }, [currency]);

  const availableCurrencies: TCurrency[] = [
    "GBP",
    "USD",
    "EUR",
    "CAD",
    "AUD",
    "JPY",
    "CNY",
  ];

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, availableCurrencies }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error(
      "useCurrencyContext must be used within a CurrencyProvider",
    );
  }
  return context;
};
