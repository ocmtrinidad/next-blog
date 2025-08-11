"use server";

import { addPost } from "@/models/posts";
import { redirect } from "next/navigation";

type PostErrors = {
  title?: string;
  content?: string;
  image?: string;
};

export type PostFormState = {
  errors: PostErrors;
};

export const createPost = async (
  id: string,
  prevState: FormData,
  formData: FormData
) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as string;

  const errors: PostErrors = {};
  if (!title) {
    errors.title = "Title is required";
  }

  if (!content) {
    errors.content = "Content is required";
  }

  if (!image) {
    errors.image = "Image is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await addPost(id, title, content, image);
  redirect("/");
};
