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

export const getFollowing = async (followerId: string, followedId: string) => {
  return await prisma.following.findFirst({
    where: {
      AND: [{ followerId }, { followedId }],
    },
  });
};

export const getFollowings = async (followerId: string) => {
  return await prisma.following.findMany({
    where: {
      followerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
