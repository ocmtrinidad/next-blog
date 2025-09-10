import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getLikedPosts, Post } from "@/models/postModels";
import PostList from "../(components)/PostList";

export default async function LikedPostsPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  const likedPosts: Post[] = await getLikedPosts(session.user.id);

  if (!likedPosts || likedPosts.length === 0) {
    return <div>You have no posts liked.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Liked Posts</h2>
      <PostList posts={likedPosts} route={"/liked-posts"} />
    </div>
  );
}
