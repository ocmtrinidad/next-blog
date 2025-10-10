"use server";

import { createFollowing, deleteFollowing } from "@/models/followingModels";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const followUser = async (
  followerId: string,
  followedId: string,
  route: string
) => {
  try {
    await createFollowing(followerId, followedId);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(route);
  redirect(route);
};

export const unfollowUser = async (followerId: string, route: string) => {
  try {
    await deleteFollowing(followerId);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(route);
  redirect(route);
};
