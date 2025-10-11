"use client";

import { followUser } from "../controllers/followingControllers";
import { usePathname } from "next/navigation";
import BlueButton from "./BlueButton";

export default function FollowButton({
  followerId,
  followedId,
}: {
  followerId: string;
  followedId: string;
}) {
  const pathname = usePathname();
  return (
    <div
      className="flex items-center"
      onClick={() => followUser(followerId, followedId, pathname)}
    >
      <BlueButton>Follow</BlueButton>
    </div>
  );
}
