"use client";

import BlueButton from "./BlueButton";
import { Post } from "@/models/postModels";
import { UserType } from "@/models/userModels";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function DisplayLikeButton({
  user,
  post,
}: {
  user: UserType | null;
  post: Post;
}) {
  const [liked, setLiked] = useState(
    post.Like.some((like) => like.userId === user?.id)
  );
  const [likeCount, setLikeCount] = useState(post.Like.length);

  const handleLikeToggle = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      redirect("/api/auth/signin?callbackUrl=/");
    }

    if (liked) {
      const response = await fetch(`/api/likes/${post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });
      if (response.ok) {
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      }
    } else {
      const response = await fetch(`/api/likes/${post.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });
      if (response.ok) {
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    }
  };

  return (
    <form
      onSubmit={handleLikeToggle}
      className="cursor-pointer flex items-center gap-2 border-l pl-2"
    >
      <BlueButton>{liked ? "Unlike" : "Like"}</BlueButton>
      <p>{likeCount}</p>
    </form>
  );
}
