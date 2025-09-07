import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import EditPostForm from "./edit-post-form";
import { redirect } from "next/navigation";
import { getPost } from "@/models/postModels";
import { getCategories } from "@/models/categoryModels";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [session, post, categories] = await Promise.all([
    getServerSession(options),
    getPost(id),
    getCategories(),
  ]);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  if (!post || post.authorId !== session.user.id) {
    redirect("/");
  }

  return <EditPostForm post={post} categories={categories} />;
}
