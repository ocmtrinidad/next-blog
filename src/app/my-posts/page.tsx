import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getPostsByAuthor } from "@/models/postsModels";
import PostList from "../(components)/PostList";

export default async function ProfilePage() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }

  const posts = await getPostsByAuthor(session.user.id);
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Your Posts</h1>
      <PostList posts={posts} />
    </>
  );
}
