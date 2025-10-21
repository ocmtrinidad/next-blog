import {
  getFollowedPosts,
  getPostsByCategory,
  Post,
} from "@/models/postModels";
import PostList from "@/app/(components)/PostList";
import CategoryList from "@/app/(components)/CategoryList";
import { Category, getCategories } from "@/models/categoryModels";
import SearchBar from "@/app/(components)/SearchBar";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function CategoryPosts({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ query?: string }>;
}) {
  const { name } = await params;
  const { query } = await searchParams;
  const session = await getServerSession(options);
  const [posts, categories]: [Post[], Category[]] = await Promise.all([
    name === "Followed-Posts"
      ? await getFollowedPosts(session.user.id, query)
      : await getPostsByCategory(name, query),
    await getCategories(),
  ]);

  if (!session && name === "Followed-Posts") {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  return (
    <>
      <CategoryList
        categories={categories}
        selectedCategoryName={name}
        session={session ? session.user : session}
      />
      <SearchBar
        route={`/category/${name}`}
        placeholder={`Search Posts in ${name}`}
      />
      {!posts || !posts.length ? (
        <p className="text-center">No posts found in this category.</p>
      ) : (
        <PostList
          posts={posts}
          route={`/category/${name}`}
          sessionUser={session ? session.user : session}
        />
      )}
    </>
  );
}
