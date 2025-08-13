"use server";

import { addPost } from "@/models/postsModels";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type PostErrors = {
  title?: string;
  content?: string;
  image?: string;
};

export type PostFormState = {
  errors: PostErrors;
  title?: string;
  content?: string;
};

export const createPost = async (
  id: string,
  prevState: FormData,
  formData: FormData
) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as File;

  const errors: PostErrors = {};
  if (!title) {
    errors.title = "Title is required";
  }

  if (!content) {
    errors.content = "Content is required";
  }
  if (!image.size) {
    errors.image = "Image is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, title, content, image };
  }

  await addPost(id, title, content, image);
  revalidatePath("/");
  redirect("/");
};
