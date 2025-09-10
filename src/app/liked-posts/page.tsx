import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getLikedPosts, Post } from "@/models/postModels";
import PostList from "../(components)/PostList";
import SearchBar from "../(components)/SearchBar";

export default async function LikedPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const session = await getServerSession(options);
  const { query } = await searchParams;

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  const likedPosts: Post[] = await getLikedPosts(session.user.id, query);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Liked Posts</h2>

      <SearchBar route={"/liked-posts"} placeholder={`Search Liked Posts`} />
      {!likedPosts || !likedPosts.length ? (
        <p className="text-center">No Liked Posts Found.</p>
      ) : (
        <PostList posts={likedPosts} route={"/liked-posts"} />
      )}
    </div>
  );
}
