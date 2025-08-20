import { getPosts, Post } from "@/models/postsModels";
import PostList from "./(components)/PostList";
import CategoryList from "./(components)/CategoryList";
import { Category, getCategories } from "@/models/categoryModels";
import SearchPost from "./(components)/SearchPost";

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
      <SearchPost route={"/"} placeholder="Search Posts" />
      <PostList posts={posts} />
    </>
  );
}
