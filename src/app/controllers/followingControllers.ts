"use server";

import { createFollowing, deleteFollowing } from "@/models/followingModels";

export const followUser = async (followerId: string, followedId: string) => {
  try {
    return await createFollowing(followerId, followedId);
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = async (followerId: string) => {
  try {
    return await deleteFollowing(followerId);
  } catch (error) {
    console.log(error);
  }
};
