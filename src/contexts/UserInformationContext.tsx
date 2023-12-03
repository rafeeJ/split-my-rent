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
import { TDistribution } from "@/types/types";
import { rentPerPerson } from "@/lib/calculations/rentPerPerson";

interface IUserInformationContextType {
  bills: TBill[];
  setBills: Dispatch<SetStateAction<TBill[]>>;
  housemates: THousemate[];
  setHousemates: Dispatch<SetStateAction<THousemate[]>>;
  rent: number;
  setRent: Dispatch<SetStateAction<number>>;
  rentDistribution: TDistribution;
  setRentDistribution: Dispatch<SetStateAction<TDistribution>>;
  rentSplit: any;
  customRentSplit: any;
  setCustomRentSplit: Dispatch<SetStateAction<any>>;
}

const UserInformationContext = createContext<IUserInformationContextType>({
  bills: [],
  setBills: () => {},
  housemates: [],
  setHousemates: () => {},
  rent: 0,
  setRent: () => {},
  rentDistribution: "equally",
  setRentDistribution: () => {},
  rentSplit: [],
  customRentSplit: [],
  setCustomRentSplit: () => {},
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

  const [rent, setRent] = useState<number>(() => {
    if (isServer) return 1000;
    const rentFromLocalStorage = localStorage.getItem("rent");
    if (rentFromLocalStorage) {
      return JSON.parse(rentFromLocalStorage);
    }
    return 1000;
  });
  const [rentDistribution, setRentDistribution] =
    useState<TDistribution>("equally");
  const [customRentSplit, setCustomRentSplit] = useState<any>(() => {
    return {
      housemateId: "",
      rent: 0,
    };
  });

  const rentSplit = rentPerPerson({
    rent,
    housemates,
    rentDistribution,
  });

  useEffect(() => {
    // when there is a change, store the data in local storage
    localStorage.setItem("housemates", JSON.stringify(housemates));
    localStorage.setItem("bills", JSON.stringify(bills));
    localStorage.setItem("rent", JSON.stringify(rent));
  }, [housemates, bills, rent]);

  return (
    <UserInformationContext.Provider
      value={{
        bills,
        setBills,
        housemates,
        setHousemates,
        rent,
        setRent,
        rentDistribution,
        setRentDistribution,
        rentSplit,
        customRentSplit,
        setCustomRentSplit,
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
