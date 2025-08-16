import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getPosts } from "@/models/postsModels";
import PostList from "../(components)/PostList";
import EditProfileForm from "./EditProfileForm";

export default async function ProfilePage() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }

  const posts = await getPosts(session.user.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Profile Page</h1>
      <div className="flex gap-4">
        <div className="w-2/5">
          <EditProfileForm user={session.user} />
        </div>

        <div className="flex-1">
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
}
