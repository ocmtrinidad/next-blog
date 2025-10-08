"use server";

import {
  createComment,
  deleteComment,
  getCommentsByPostId,
} from "@/models/commentModels";

export const getAllCommentsByPost = async (postId: string) => {
  return await getCommentsByPostId(postId);
};

export const submitComment = async (
  postId: string,
  authorId: string,
  content: string
) => {
  try {
    return await createComment(content, authorId, postId);
  } catch (error) {
    return { error: error };
  }
};

export const removeComment = async (commentId: string) => {
  try {
    return await deleteComment(commentId);
  } catch (error) {
    return { error: error };
  }
};
