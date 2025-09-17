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
import DisplayComment from "./Comment";

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
    <div className="flex flex-col gap-2">
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
          <DisplayComment
            key={comment.id}
            comment={comment}
            user={user}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
}
