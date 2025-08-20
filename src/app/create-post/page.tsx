import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import CreatePostForm from "./create-post-form";
import { redirect } from "next/navigation";
import { getCategories } from "@/models/categoryModels";

export default async function CreatePostPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  const categories = await getCategories();

  return <CreatePostForm user={session.user} categories={categories} />;
}
