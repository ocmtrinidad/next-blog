"use client";

import { UserType } from "@/models/userModels";
import { followUser } from "../controllers/followingControllers";
import BlueButton from "./BlueButton";

export default function FollowButton({
  followerId,
  followedId,
}: {
  followerId: string;
  followedId: UserType;
}) {
  return (
    <div
      className="flex mb-2"
      onClick={() => followUser(followerId, followedId.id, followedId.name)}
    >
      <BlueButton>Follow</BlueButton>
    </div>
  );
}
