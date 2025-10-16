"use client";

import { Post } from "@/models/postModels";
import Link from "next/link";
import DisplayPostUserButtons from "./DisplayPostUserButtons";
import DisplayLikeButton from "./DisplayLikeButton";
import SmallProfilePicture from "./SmallProfilePicture";
import DisplayCommentCounter from "./DisplayCommentCounter";
import { UserType } from "@/models/userModels";
import { useState } from "react";
import BlueButton from "./BlueButton";
import { followUser, unfollowUser } from "../controllers/followingControllers";

export default function PostHeader({
  post,
  route,
  sessionUser,
}: {
  post: Post;
  route: string;
  sessionUser: UserType | null;
}) {
  const [isFollowing, setIsFollowing] = useState(
    post.author.Followed?.some(
      (followed) => followed.followerId === sessionUser?.id
    )
  );

  // DOES NOT UPDATE OTHER POSTS
  const handleFollow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFollowing) {
      const newFollow = await followUser(sessionUser!.id, post.author.id);
      if (newFollow) {
        setIsFollowing(true);
      }
    } else {
      const followObject = post.author.Followed?.find(
        (follow) =>
          follow.followerId === sessionUser?.id &&
          post.author.id === follow.followedId
      );
      const newUnfollow = await unfollowUser(followObject!.id);
      if (newUnfollow) {
        setIsFollowing(false);
      }
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col border-b">
      <Link
        href={`/post/${post.id}`}
        className="text-2xl font-bold max-w-fit line-clamp-1"
      >
        {post.title}
      </Link>
      <Link
        href={`/user/${post.author.name}`}
        className="max-w-fit flex items-center gap-2"
      >
        <SmallProfilePicture user={post.author} />
        <p>{post.author.name}</p>
      </Link>
      <form onSubmit={handleFollow}>
        {sessionUser &&
          sessionUser.id !== post.author.id &&
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
      <div className="flex flex-col md:flex-row mb-2 items-start md:gap-2 md:items-center">
        <p>{new Date(post.createdAt).toDateString()}</p>
        <div className="flex items-center gap-2">
          <DisplayLikeButton user={sessionUser!} post={post} />
          <DisplayCommentCounter post={post} />
          <DisplayPostUserButtons
            post={post}
            route={route}
            userId={sessionUser!.id}
          />
        </div>
      </div>
    </div>
  );
}
