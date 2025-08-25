import { getPostsByAuthor } from "@/models/postsModels";
import PostList from "@/app/(components)/PostList";
import { getUserById } from "@/models/usersModels";
import SearchPost from "@/app/(components)/SearchPost";
import Image from "next/image";

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
    <div className="flex flex-col gap-4">
      <div className="border-b">
        <h1 className="text-2xl font-bold">{user?.name}'s Profile Page</h1>
        {user && user.image && (
          <Image
            src={user.image}
            width={50}
            height={50}
            alt={user.name}
            priority={true}
            className="rounded-full"
          />
        )}
        <p>{user?.bio}</p>
      </div>
      <SearchPost
        route={`/user/${user?.id}`}
        placeholder={`Search ${user?.name}'s Posts`}
      />
      <PostList posts={posts} />
    </div>
  );
}
