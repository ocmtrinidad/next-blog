import { getPosts, Post } from "@/models/postModels";
import PostList from "./(components)/PostList";
import CategoryList from "./(components)/CategoryList";
import { Category, getCategories } from "@/models/categoryModels";
import SearchBar from "./(components)/SearchBar";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const posts: Post[] = await getPosts(query);
  const categories: Category[] = await getCategories();

  return (
    <>
      <CategoryList categories={categories} selectedCategoryName={null} />
      <SearchBar route={"/"} placeholder="Search Posts" />
      <PostList posts={posts} />
    </>
  );
}
