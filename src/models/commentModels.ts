import prisma from "../../lib/prisma";
import { UserType } from "./userModels";

export type Comment = {
  id: string;
  content: string;
  author: UserType;
  postId: string;
  createdAt: Date;
};

export const getCommentsByPostId = async (postId: string) => {
  return await prisma.comment.findMany({
    where: { postId },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });
};

export const addComment = async (
  content: string,
  authorId: string,
  postId: string
) => {
  return await prisma.comment.create({
    data: {
      content,
      authorId,
      postId,
    },
  });
};

export const deleteComment = async (commentId: string) => {
  return await prisma.comment.delete({
    where: { id: commentId },
  });
};

export const deleteAllCommentsByPostId = async (postId: string) => {
  return await prisma.comment.deleteMany({
    where: { postId },
  });
};
