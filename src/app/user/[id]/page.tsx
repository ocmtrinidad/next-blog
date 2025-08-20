import { getPostsByAuthor } from "@/models/postsModels";
import PostList from "@/app/(components)/PostList";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getUserById } from "@/models/usersModels";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await getServerSession(options);

  if (session && session.user.id === id) {
    redirect("/my-posts");
  } else {
    const [posts, user] = await Promise.all([
      getPostsByAuthor(id),
      getUserById(id),
    ]);
    return (
      <div className="flex gap-4">
        <div className="w-2/5">
          <h1 className="text-2xl font-bold">{user?.name}'s Profile Page</h1>
          <p>{user?.bio}</p>
        </div>

        <div className="flex-1">
          <PostList posts={posts} />
        </div>
      </div>
    );
  }
}
