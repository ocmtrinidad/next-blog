import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getPostsByAuthor } from "@/models/postsModels";
import PostList from "../(components)/PostList";
import SearchPost from "../(components)/SearchPost";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }

  const { query } = await searchParams;

  const posts = await getPostsByAuthor(session.user.id, query);
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Your Posts</h1>
      <SearchPost route={"/my-posts"} placeholder="Search Your Posts" />
      <PostList posts={posts} />
    </>
  );
}
