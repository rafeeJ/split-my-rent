import { useUserInformationContext } from "@/contexts/UserInformationContext";
import { TDistribution } from "@/types/types";
import { StaticRentTable } from "@/components/RentTable/StaticRentTable";
import { CustomRentTable } from "@/components/RentTable/CustomRentTable";

export const RentDistributionTable = ({
  distributionMethod,
}: {
  distributionMethod: TDistribution;
}) => {
  const { housemates, setHousemates, rent, setRent, rentSplit } =
    useUserInformationContext();

  if (distributionMethod !== "custom") {
    return <StaticRentTable housemates={housemates} rentSplit={rentSplit} />;
  }

  return <CustomRentTable />;
};
