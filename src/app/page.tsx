import { getPosts, Post } from "@/models/postsModels";
import PostList from "./(components)/PostList";
import CategoryList from "./(components)/CategoryList";
import { Category, getCategories } from "@/models/categoryModels";

export default async function Home() {
  const posts: Post[] = await getPosts();
  const categories: Category[] = await getCategories();

  return (
    <>
      <CategoryList categories={categories} selectedCategoryName={null} />
      <PostList posts={posts} />
    </>
  );
}
