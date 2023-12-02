import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { CheckIcon, LoaderIcon } from "lucide-react";

export const SubmitUrlButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="shrink-0" type={"submit"} disabled={pending}>
      {pending ? <LoaderIcon className="animate-spin mr-2" /> : null}
      {pending ? "Fetching Rent Data" : "Get Rent Data"}
    </Button>
  );
};
