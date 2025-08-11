import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import CreatePostForm from "./create-post-form";
import { redirect } from "next/navigation";

export default async function CreatePostPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  return <CreatePostForm user={session.user} />;
}
