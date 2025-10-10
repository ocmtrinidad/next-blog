"use client";

import { UserType } from "@/models/userModels";
import { followUser } from "../controllers/followingControllers";
import BlueButton from "./BlueButton";
import { usePathname } from "next/navigation";

export default function FollowButton({
  followerId,
  followedId,
}: {
  followerId: string;
  followedId: UserType;
}) {
  const pathname = usePathname();
  return (
    <div
      className="flex"
      onClick={() => followUser(followerId, followedId.id, pathname)}
    >
      <BlueButton>Follow</BlueButton>
    </div>
  );
}
