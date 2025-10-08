"use server";

import {
  createFollowing,
  deleteFollowing,
  getFollowings,
} from "@/models/followingModels";

export const followUser = async (followerId: string, followedId: string) => {
  try {
    await createFollowing(followerId, followedId);
    return await getFollowings(followerId);
  } catch (error) {
    console.log(error);
  }
};
