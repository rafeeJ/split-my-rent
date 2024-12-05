import { TDistribution, THousemateTotal } from "@/types/types";

export const billsWithRent = (
  housemateTotals: THousemateTotal[],
  rentSplit: { [id: string]: number },
  rentDistribution: TDistribution,
  customRentSplit: { [id: string]: number },
): THousemateTotal[] => {
  if (rentDistribution !== "custom") {
    return housemateTotals.map((housemateTotal: THousemateTotal) => {
      const { total, share } = housemateTotal;
      return {
        ...housemateTotal,
        total: total + rentSplit[housemateTotal.housemate.id],
        share: [
          ...share,
          {
            name: "Rent",
            amount: rentSplit[housemateTotal.housemate.id],
          },
        ],
      };
    });
  } else {
    return housemateTotals.map((housemateTotal: THousemateTotal) => {
      const { total, share } = housemateTotal;
      return {
        ...housemateTotal,
        total: total + customRentSplit[housemateTotal.housemate.id],
        share: [
          ...share,
          {
            name: "Rent",
            amount: customRentSplit[housemateTotal.housemate.id],
          },
        ],
      };
    });
  }
};
