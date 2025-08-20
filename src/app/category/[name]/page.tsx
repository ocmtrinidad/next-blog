import { getPostsByCategory, Post } from "@/models/postsModels";
import PostList from "@/app/(components)/PostList";
import CategoryList from "@/app/(components)/CategoryList";
import { Category, getCategories } from "@/models/categoryModels";

export default async function CategoryPosts({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const [posts, categories]: [Post[], Category[]] = await Promise.all([
    await getPostsByCategory(name),
    await getCategories(),
  ]);

  return (
    <>
      <CategoryList categories={categories} selectedCategoryName={name} />
      {!posts || !posts.length ? (
        <p className="text-center">No posts found in this category.</p>
      ) : (
        <PostList posts={posts}/>
      )}
    </>
  );
}
