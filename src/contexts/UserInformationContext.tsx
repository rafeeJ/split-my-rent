"use client";
import { TBill } from "@/components/BillTable/Columns";
import { THousemate } from "@/components/HousemateTable/Columns";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { defaultBills, defaultHousemates } from "@/lib/localstorage";

interface IUserInformationContextType {
  bills: TBill[];
  setBills: Dispatch<SetStateAction<TBill[]>>;
  housemates: THousemate[];
  setHousemates: Dispatch<SetStateAction<THousemate[]>>;
}

const UserInformationContext = createContext<IUserInformationContextType>({
  bills: [],
  setBills: () => {},
  housemates: [],
  setHousemates: () => {},
});

export const UserInformationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const isServer = typeof window === "undefined";
  const [bills, setBills] = useState<TBill[]>(() => {
    if (isServer) return defaultBills;
    const billsFromLocalStorage = localStorage.getItem("bills");
    if (billsFromLocalStorage) {
      return JSON.parse(billsFromLocalStorage);
    }
    return defaultBills;
  });

  const [housemates, setHousemates] = useState<THousemate[]>(() => {
    if (isServer) return defaultHousemates;
    const housematesFromLocalStorage = localStorage.getItem("housemates");
    if (housematesFromLocalStorage) {
      return JSON.parse(housematesFromLocalStorage);
    }
    return defaultHousemates;
  });

  useEffect(() => {
    // when there is a change, store the data in local storage
    localStorage.setItem("housemates", JSON.stringify(housemates));
    localStorage.setItem("bills", JSON.stringify(bills));
  }, [housemates, bills]);

  return (
    <UserInformationContext.Provider
      value={{
        bills,
        setBills,
        housemates,
        setHousemates,
      }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

export const useUserInformationContext = () => {
  const context = useContext(UserInformationContext);
  if (context === undefined) {
    throw new Error(
      "useUserInformationContext must be used within a UserInformationProvider",
    );
  }
  return context;
};
