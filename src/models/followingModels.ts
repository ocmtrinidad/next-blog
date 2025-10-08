import prisma from "../../lib/prisma";

export const createFollowing = async (
  followerId: string,
  followedId: string
) => {
  return await prisma.following.create({
    data: {
      followerId,
      followedId,
    },
  });
};

export const deleteFollowing = async (id: string) => {
  return await prisma.following.delete({
    where: {
      id,
    },
  });
};
