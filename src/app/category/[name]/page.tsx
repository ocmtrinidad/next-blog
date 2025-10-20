import { getPostsByCategory, Post } from "@/models/postModels";
import PostList from "@/app/(components)/PostList";
import CategoryList from "@/app/(components)/CategoryList";
import { Category, getCategories } from "@/models/categoryModels";
import SearchBar from "@/app/(components)/SearchBar";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function CategoryPosts({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ query?: string }>;
}) {
  const { name } = await params;
  const { query } = await searchParams;
  const [posts, categories]: [Post[], Category[]] = await Promise.all([
    await getPostsByCategory(name, query),
    await getCategories(),
  ]);
  const session = await getServerSession(options);

  return (
    <>
      <CategoryList categories={categories} selectedCategoryName={name} />
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
