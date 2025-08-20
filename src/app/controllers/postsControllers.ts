"use server";

import { addPost, deletePost, updatePost } from "@/models/postsModels";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type PostErrors = {
  title?: string;
  content?: string;
  image?: string;
  category?: string;
};

export type PostFormState = {
  errors: PostErrors;
  title?: string;
  content?: string;
  category?: string;
};

export const createPost = async (
  id: string,
  prevState: PostFormState | undefined,
  formData: FormData
): Promise<PostFormState | undefined> => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as File;
  const category = formData.get("category") as string;

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
  if (!category) {
    errors.category = "Category is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, title, content, category };
  }
  try {
    await addPost(id, title, content, image, category);
    revalidatePath("/");
  } catch (error) {
    console.log("Error creating post:", error);
    return {
      errors: { title: "Failed to create post. Please try again." },
      title,
      content,
      category,
    };
  }

  redirect("/");
};

export const removePost = async (id: string) => {
  try {
    await deletePost(id);
    revalidatePath("/my-posts");
  } catch (error) {
    console.log("Error deleting post:", error);
    return;
  }

  redirect("/my-posts");
};

export const editPost = async (
  postId: string,
  prevState: PostFormState | undefined,
  formData: FormData
): Promise<PostFormState | undefined> => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;

  const errors: PostErrors = {};
  if (!title) {
    errors.title = "Title is required";
  }

  if (!content) {
    errors.content = "Content is required";
  }

  if (!category) {
    errors.category = "Category is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, title, content };
  }

  try {
    await updatePost(postId, title, content, category);
    revalidatePath("/my-posts");
  } catch (error) {
    console.log("Error updating post:", error);
    return {
      errors: { title: "Failed to update post. Please try again." },
      title,
      content,
    };
  }
  redirect("/my-posts");
};
