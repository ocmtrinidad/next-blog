"use client";

import { Comment } from "@/models/commentModels";
import BlueButton from "./BlueButton";
import { useState } from "react";
import { UserType } from "@/models/userModels";
import { redirect } from "next/navigation";
import { Post } from "@/models/postModels";
import Image from "next/image";
import Link from "next/link";

export default function CommentsSection({
  post,
  user,
}: {
  post: Post;
  user: UserType | null;
}) {
  const [comments, setComments] = useState<Comment[]>(post.Comment);

  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      redirect("/api/auth/signin?callbackUrl=/");
    }

    const response = await fetch(`/api/posts/${post.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorId: user.id,
        content: e.currentTarget.comment.value,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      setComments(data);
    }
  };

  if (!post) {
    return <div>No post found.</div>;
  }

  return (
    <div className="border-t pt-4 flex flex-col gap-2">
      <h1 className="font-bold text-xl">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h1>
      <form onSubmit={submitComment} className="flex">
        <input
          type="text"
          name="comment"
          placeholder="Add A Comment"
          className="border border-r-0 flex-1 rounded rounded-r-none rounded-br-none p-2"
        />
        <div className="flex">
          <BlueButton>Submit</BlueButton>
        </div>
      </form>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="border-b mb-2">
            <Link
              href={`/user/${comment.author.id}`}
              className="flex items-center gap-2 cursor-pointer max-w-fit"
            >
              {comment.author.image && (
                <Image
                  src={comment.author.image}
                  priority={true}
                  width={50}
                  height={50}
                  alt={comment.author.name}
                  className="rounded-full self-center"
                ></Image>
              )}
              <p>{comment.author.name}</p>
            </Link>
            <p>{comment.content}</p>
            <p>{comment.createdAt.toDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
