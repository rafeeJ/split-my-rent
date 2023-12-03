import { TBill } from "@/components/BillTable/Columns";
import { THousemate } from "@/components/HousemateTable/Columns";

export const calculateBillsPerPerson = ({
  billData,
  housemateData,
}: {
  billData: TBill[];
  housemateData: THousemate[];
}) => {
  const applicableBills = billData
    .map((bill) => {
      const applicableHousemates = bill.applicableHousemates.map((id) => {
        const housemate = housemateData.find((hm) => hm.id === id);
        if (!housemate) return;
        housemate.income = Number(housemate.income);
        return housemate;
      });
      return {
        ...bill,
        applicableHousemates,
      };
    })
    .map((bill) => {
      const applicableHousemates = bill.applicableHousemates.filter(
        (hm) => hm !== undefined,
      );
      return {
        ...bill,
        applicableHousemates,
      };
    });

  const housematePayments = applicableBills.map((bill) => {
    const totalApplicableIncome = bill.applicableHousemates.reduce(
      (acc, housemate) => {
        if (!housemate) return acc;
        return acc + housemate.income;
      },
      0,
    );

    const housematePayments = bill.applicableHousemates.map((housemate) => {
      if (!housemate) return;
      const proportion = bill.splitProportionally
        ? housemate.income / totalApplicableIncome
        : 1 / bill.applicableHousemates.length;
      const amount = bill.amount * proportion;

      const billName = bill.name;

      return {
        housemate,
        amount,
        billName,
      };
    });
    return housematePayments;
  });

  // for each housemate, find the bills they are applicable for and group them
  const splitBillsPerHousemate = housemateData.map((housemate) => {
    const bills = housematePayments.map((bill) => {
      const billForHousemate = bill.find((b) => {
        if (!b) return;
        return b.housemate.id === housemate.id;
      });
      return billForHousemate;
    });
    return {
      id: housemate.id,
      name: housemate.name,
      bills,
    };
  });

  return splitBillsPerHousemate;
};
