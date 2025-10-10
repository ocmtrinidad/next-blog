"use client";

import { followUser } from "../controllers/followingControllers";
import { usePathname } from "next/navigation";

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
      <button className="max-h-fit flex-1 bg-blue-500 px-2 py-1 rounded cursor-pointer hover:bg-blue-700">
        Follow
      </button>
    </div>
  );
}
