import { getPostBySlug } from "@/lib/blog/mdxSupport";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import NavigateToAppButton from "@/components/Blog/NavigateToAppButton";

export async function generateMetadata({ params }: any) {
  const post = await getPostBySlug(params.slug);
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  return (
    <section className={"flex flex-col justify-center items-center"}>
      <div className={"my-2 flex flex-row w-full"}>
        <Link href={`/blog`}>
          <Button className={"flex items-center justify-center"}>
            <ChevronLeftIcon size={15} />
            All posts
          </Button>
        </Link>
        <div className={"grow"} />
      </div>

      <article className="prose dark:prose-invert">
        <h1 className={"text-primary text-center"}>{post.frontmatter.title}</h1>
        <MDXRemote source={post.content} components={{ NavigateToAppButton }} />
      </article>
    </section>
  );
}
