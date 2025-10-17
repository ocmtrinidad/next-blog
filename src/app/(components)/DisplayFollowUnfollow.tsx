"use client";

import { useState } from "react";
import BlueButton from "./BlueButton";
import { followUser, unfollowUser } from "../controllers/followingControllers";
import { UserType } from "@/models/userModels";

export default function DisplayFollowUnfollow({
  selectedUser,
  sessionUser,
}: {
  selectedUser: UserType;
  sessionUser: UserType | null;
}) {
  const [isFollowing, setIsFollowing] = useState(
    selectedUser.Followed?.some(
      (followed) => followed.followerId === sessionUser?.id
    )
  );

  const handleFollow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFollowing) {
      const newFollow = await followUser(sessionUser!.id, selectedUser.id);
      if (newFollow) {
        setIsFollowing(true);
        window.location.reload();
      }
    } else {
      const followObject = selectedUser.Followed?.find(
        (follow) =>
          follow.followerId === sessionUser?.id &&
          selectedUser.id === follow.followedId
      );
      const newUnfollow = await unfollowUser(followObject!.id);
      if (newUnfollow) {
        setIsFollowing(false);
        window.location.reload();
      }
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleFollow}>
      {sessionUser &&
        sessionUser.id !== selectedUser.id &&
        (!isFollowing ? (
          <div className="flex items-center">
            <BlueButton>Follow</BlueButton>
          </div>
        ) : (
          <div className="flex items-center">
            <button className="max-h-fit flex-1 bg-gray-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-gray-700">
              Unfollow
            </button>
          </div>
        ))}
    </form>
  );
}
