import { getPostsByAuthor } from "@/models/postsModels";
import PostList from "@/app/(components)/PostList";
import { getUserById } from "@/models/usersModels";
import SearchPost from "@/app/(components)/SearchPost";

export default async function UserPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ query?: string }>;
}) {
  const { id } = await params;
  const { query } = await searchParams;
  const [posts, user] = await Promise.all([
    getPostsByAuthor(id, query),
    getUserById(id),
  ]);
  return (
    <div className="flex gap-4">
      <div className="w-2/5">
        <h1 className="text-2xl font-bold">{user?.name}'s Profile Page</h1>
        <p>{user?.bio}</p>
      </div>

      <div className="flex-1">
        <SearchPost
          route={`/user/${user?.id}`}
          placeholder={`Search ${user?.name}'s Posts`}
        />
        <PostList posts={posts} />
      </div>
    </div>
  );
}
