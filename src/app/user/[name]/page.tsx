import { getPostsByAuthor } from "@/models/postModels";
import PostList from "@/app/(components)/PostList";
import { getUserByName } from "@/models/userModels";
import SearchBar from "@/app/(components)/SearchBar";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import DisplayFollowUnfollow from "@/app/(components)/DisplayFollowUnfollow";

export default async function UserPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ query?: string }>;
}) {
  const { name } = await params;
  const { query } = await searchParams;
  const [posts, user] = await Promise.all([
    getPostsByAuthor(name, query),
    getUserByName(name),
  ]);
  const session = await getServerSession(options);

  if (user) {
    return (
      <div className="flex flex-col gap-4">
        <div className="border-b pb-2">
          <h1 className="text-2xl font-bold">{user.name}</h1>
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
          <p>{user.bio}</p>
          <DisplayFollowUnfollow
            selectedUser={user}
            sessionUser={session.user}
          />
        </div>
        <SearchBar
          route={`/user/${user.id}`}
          placeholder={`Search ${user.name}'s Posts`}
        />
        <PostList
          posts={posts}
          route={`/user/${user.id} `}
          sessionUser={session.user}
        />
      </div>
    );
  } else {
    return <p>User not found</p>;
  }
}
