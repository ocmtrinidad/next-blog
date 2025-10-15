import { getPosts, Post } from "@/models/postModels";
import PostList from "./(components)/PostList";
import CategoryList from "./(components)/CategoryList";
import { Category, getCategories } from "@/models/categoryModels";
import SearchBar from "./(components)/SearchBar";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const [posts, categories]: [Post[], Category[]] = await Promise.all([
    await getPosts(query),
    await getCategories(),
  ]);
  const session = await getServerSession(options);

  return (
    <>
      <CategoryList categories={categories} selectedCategoryName={null} />
      <SearchBar route={"/"} placeholder="Search Posts" />
      <PostList posts={posts} route={"/"} sessionUser={session.user} />
    </>
  );
}
