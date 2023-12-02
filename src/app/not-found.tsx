import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className={"flex w-full h-screen justify-center items-center"}>
      <Card>
        <CardHeader>
          <CardTitle>Not Found</CardTitle>
          <CardDescription>Could not find requested resource</CardDescription>
        </CardHeader>
        <CardContent>Sorry about that!</CardContent>
        <CardFooter>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
