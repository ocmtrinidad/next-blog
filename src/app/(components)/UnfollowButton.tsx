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
    <div className="flex items-center">
      <button
        onClick={() => unfollowUser(followingId, pathname)}
        className="max-h-fit flex-1 bg-gray-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-gray-700"
      >
        Unfollow
      </button>
    </div>
  );
}
