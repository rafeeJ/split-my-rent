import Link from "next/link";
import { getAllArticles } from "@/lib/blog/mdxSupport";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NavigateToAppButton from "@/components/Blog/NavigateToAppButton";
import { format, parse } from "date-fns";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Split My Rent",
  description: "Easy bill splitting for housemates, friends and partners.",
  openGraph: {
    title: "Blog | Split My Rent",
    description: "Easy bill splitting for housemates, friends and partners.",
  },
  alternates: {
    canonical: "https://splitmyrent.com/blog",
  },
};

export default async function Blog() {
  const blogs = await getAllArticles();
  return (
    <main className="flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-center">Blog</h1>

      <section className="py-2 flex flex-col justify-center items-center">
        <div className={"py-2"}>
          <NavigateToAppButton text={"Try out Split My Rent"} />
        </div>
        <div className="py-2 md:px-20 grid gap-2 grid-cols-1">
          {blogs.map((blog) => (
            <Link
              className={"max-w-screen-sm"}
              href={"/blog/" + blog.slug}
              passHref
              key={blog.slug}
            >
              <Card>
                <CardHeader>
                  <CardTitle className={"text-primary"}>
                    {blog.meta.title}
                  </CardTitle>
                  <CardDescription>{blog.readingTime}</CardDescription>
                </CardHeader>
                <CardContent>{blog.meta.description}</CardContent>
                <CardFooter>
                  {format(
                    parse(blog.meta.date, "dd/MM/yyyy", new Date()),
                    "dd MMMM yyyy",
                  )}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
