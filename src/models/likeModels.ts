import prisma from "../../lib/prisma";

export type Like = {
  id: string;
  userId: string;
  postId: string;
};

export const createLike = async (userId: string, postId: string) => {
  return await prisma.like.create({
    data: {
      userId,
      postId,
    },
  });
};

export const removeLike = async (userId: string, postId: string) => {
  return await prisma.like.deleteMany({
    where: {
      userId,
      postId,
    },
  });
};

export const deleteAllLikesByPostId = async (postId: string) => {
  return await prisma.like.deleteMany({
    where: {
      postId,
    },
  });
};
