"use client";

import { unfollowUser } from "../controllers/followingControllers";

export default function UnfollowButton({
  followingId,
  followedName,
}: {
  followingId: string;
  followedName: string;
}) {
  return (
    <div className="flex mb-2">
      <button
        onClick={() => unfollowUser(followingId, followedName)}
        className="flex-1 bg-gray-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-gray-700 h-full"
      >
        Unfollow
      </button>
    </div>
  );
}
