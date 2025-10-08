"use server";

import { createPost, deletePost, Post, updatePost } from "@/models/postModels";
import { getUserById } from "@/models/userModels";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type PostErrors = {
  title?: string;
  content?: string;
  image?: string;
  category?: string;
  password?: string;
};

export type PostFormState = {
  errors: PostErrors;
  title?: string;
  content?: string;
  category?: string;
};

export const submitPost = async (
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
  if (title.length > 100) {
    errors.title = "Title must not exceed 100 characters";
  }
  if (Object.keys(errors).length > 0) {
    return { errors, title, content, category };
  }

  try {
    await createPost(id, title, content, image, category);
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

export const removePost = async (
  post: Post,
  userId: string,
  password: string,
  route: string
) => {
  try {
    const currentUser = await getUserById(userId);
    if (!currentUser) {
      return {
        errors: { password: "User not found" },
      };
    }

    const passwordMatch = await bcrypt.compare(password, currentUser.password);
    if (!passwordMatch) {
      return {
        errors: { password: "Incorrect password" },
      };
    }
    await deletePost(post);
    revalidatePath(route);
  } catch (error) {
    console.log("Error deleting post:", error);
    return;
  }

  redirect(route);
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
  if (title.length > 100) {
    errors.title = "Title must not exceed 100 characters";
  }
  if (Object.keys(errors).length > 0) {
    return { errors, title, content };
  }

  try {
    await updatePost(postId, title, content, category);
    revalidatePath(`/post/${postId}`);
  } catch (error) {
    console.log("Error updating post:", error);
    return {
      errors: { title: "Failed to update post. Please try again." },
      title,
      content,
    };
  }
  redirect(`/post/${postId}`);
};
