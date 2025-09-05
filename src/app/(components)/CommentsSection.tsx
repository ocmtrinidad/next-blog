"use client";

import { Comment } from "@/models/commentModels";
import BlueButton from "./BlueButton";
import { useRef, useState } from "react";
import { UserType } from "@/models/userModels";
import { redirect } from "next/navigation";
import { Post } from "@/models/postModels";
import Link from "next/link";
import SmallProfilePicture from "./SmallProfilePicture";
import {
  getAllCommentsByPost,
  removeComment,
  submitComment,
} from "../controllers/commentsControllers";

export default function CommentsSection({
  post,
  user,
}: {
  post: Post;
  user: UserType | null;
}) {
  const [comments, setComments] = useState<Comment[]>(post.Comment);

  const commentRef = useRef<HTMLInputElement>(null);

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      redirect("/api/auth/signin?callbackUrl=/");
    }

    try {
      await submitComment(post.id, user.id, e.currentTarget.comment.value);
      const updatedComments = await getAllCommentsByPost(post.id);
      setComments(updatedComments);
      commentRef.current!.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (id: string) => {
    try {
      await removeComment(id);
      const updatedComments = await getAllCommentsByPost(post.id);
      setComments(updatedComments);
    } catch (error) {
      console.log(error);
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
      <form onSubmit={handleSubmitComment} className="flex">
        <input
          type="text"
          name="comment"
          placeholder="Add A Comment"
          className="border border-r-0 flex-1 rounded rounded-r-none rounded-br-none p-2"
          ref={commentRef}
        />
        <div className="flex">
          <BlueButton>Submit</BlueButton>
        </div>
      </form>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <div className="grid grid-cols-[max-content_1fr]">
              <Link
                href={`/user/${comment.author.id}`}
                className="cursor-pointer"
              >
                <SmallProfilePicture user={comment.author} />
              </Link>

              <div className="flex gap-2 items-center ml-2">
                <Link
                  href={`/user/${comment.author.id}`}
                  className="cursor-pointer"
                >
                  <p>{comment.author.name}</p>
                </Link>
                <p>{new Date(comment.createdAt).toDateString()}</p>
                {user && user.id === comment.author.id && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteComment(comment.id);
                    }}
                    className="cursor-pointer bg-red-600 hover:bg-red-800 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-8 h-6"
                    >
                      <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="col-start-2 ml-2">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
