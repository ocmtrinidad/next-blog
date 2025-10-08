"use server";

import { createLike, removeLike } from "@/models/likeModels";

export async function likePost(userId: string, postId: string) {
  return await createLike(userId, postId);
}

export async function unlikePost(userId: string, postId: string) {
  return await removeLike(userId, postId);
}
