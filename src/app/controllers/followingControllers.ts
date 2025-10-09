"use server";

import {
  createFollowing,
  deleteFollowing,
  getFollowings,
} from "@/models/followingModels";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const followUser = async (
  followerId: string,
  followedId: string,
  name: string
) => {
  try {
    await createFollowing(followerId, followedId);
    revalidatePath(`/user/${name}`);
    redirect(`/user/${name}`);
  } catch (error) {
    console.log(error);
  }
};
