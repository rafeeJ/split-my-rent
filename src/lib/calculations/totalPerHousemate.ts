import { TBill } from "@/components/BillTable/Columns";
import { THousemate } from "@/components/HousemateTable/Columns";
import { THousemateTotal } from "@/types/types";

export const calculateBillsPerPerson = ({
  billData,
  housemateData,
}: {
  billData: TBill[];
  housemateData: THousemate[];
}): THousemateTotal[] => {
  const baseHousemateTotals = housemateData.map((housemate) => ({
    housemate,
    share: new Array<{ name: string; amount: number }>(),
    total: 0,
  }));

  const totalHousemateIncome = housemateData.reduce(
    (total, housemate) => total + Number(housemate.income),
    0,
  );

  // for each bill, get a list of applicable housemates
  billData.forEach((bill) => {
    const applicableHousemates = bill.applicableHousemates
      .map((id) => {
        const housemate = getHousemateFromId(id, housemateData);
        if (!housemate) return;
        housemate.income = Number(housemate.income);
        return housemate;
      })
      .filter((housemate) => housemate !== undefined) as THousemate[];

    const { amount, splitProportionally } = bill;
    if (!splitProportionally) {
      const amountPerHousemate = amount / applicableHousemates.length;
      applicableHousemates.forEach((housemate) => {
        const housemateTotal = baseHousemateTotals.find(
          (baseHousemateTotal) => baseHousemateTotal.housemate === housemate,
        );
        if (!housemateTotal) return;
        housemateTotal.share.push({
          name: bill.name,
          amount: amountPerHousemate,
        });
      });
    } else {
      applicableHousemates.forEach((housemate) => {
        const housemateTotal = baseHousemateTotals.find(
          (baseHousemateTotal) => baseHousemateTotal.housemate === housemate,
        );
        if (!housemateTotal) return;
        housemateTotal.share.push({
          name: bill.name,
          amount: (housemate.income / totalHousemateIncome) * amount,
        });
      });
    }
  });

  // calculate total per housemate
  baseHousemateTotals.forEach((housemateTotal) => {
    housemateTotal.total = housemateTotal.share.reduce(
      (total, share) => total + share.amount,
      0,
    );
  });

  return baseHousemateTotals;
};

const getHousemateFromId = (housemateId: number, housemates: THousemate[]) => {
  return housemates.find((housemate) => housemate.id === housemateId);
};
