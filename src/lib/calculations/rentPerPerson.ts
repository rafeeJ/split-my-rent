import { THousemate } from "@/components/HousemateTable/Columns";
import { TDistribution } from "@/types/types";
import { TBill } from "@/components/BillTable/Columns";

export const rentPerPerson = ({
  rent,
  housemates,
  rentDistribution,
}: {
  rent: number;
  housemates: THousemate[];
  rentDistribution: TDistribution;
}): {
  [name: string]: number;
} => {
  if (rentDistribution === "equally") {
    const rentPerHousemate = rent / housemates.length;
    const rentPerPerson: { [name: string]: number } = {};
    housemates.forEach((housemate) => {
      rentPerPerson[housemate.name] = rentPerHousemate;
    });
    return rentPerPerson;
  } else if (rentDistribution === "proportionally") {
    const totalIncome = housemates.reduce(
      (total, housemate) => total + housemate.income,
      0,
    );
    const rentPerPerson: { [name: string]: number } = {};
    housemates.forEach((housemate) => {
      rentPerPerson[housemate.name] = (housemate.income / totalIncome) * rent;
    });
    return rentPerPerson;
  } else {
    const rentPerPerson: { [name: string]: number } = {};
    housemates.forEach((housemate) => {
      rentPerPerson[housemate.name] = 0;
    });
    return rentPerPerson;
  }
};
