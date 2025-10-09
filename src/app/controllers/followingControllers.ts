"use server";

import { createFollowing, deleteFollowing } from "@/models/followingModels";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const followUser = async (
  followerId: string,
  followedId: string,
  name: string
) => {
  try {
    await createFollowing(followerId, followedId);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/user/${name}`);
  redirect(`/user/${name}`);
};

export const unfollowUser = async (followerId: string, name: string) => {
  try {
    await deleteFollowing(followerId);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/user/${name}`);
  redirect(`/user/${name}`);
};
