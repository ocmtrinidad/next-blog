"use client";

import { usePathname } from "next/navigation";
import { unfollowUser } from "../controllers/followingControllers";

export default function UnfollowButton({
  followingId,
}: {
  followingId: string;
}) {
  const pathname = usePathname();
  return (
    <div className="flex">
      <button
        onClick={() => unfollowUser(followingId, pathname)}
        className="flex-1 bg-gray-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-gray-700 h-full"
      >
        Unfollow
      </button>
    </div>
  );
}
