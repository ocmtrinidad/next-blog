"use client";

import { useActionState } from "react";
import { PostFormState, createPost } from "../controllers/postsControllers";
import { UserType } from "@/models/users";

export default function CreatePostForm({ user }: { user: UserType }) {
  const initialState: PostFormState = {
    errors: {},
  };

  const createPostWithId = createPost.bind(null, user.id);

  const [state, formAction, isPending] = useActionState(
    createPostWithId,
    initialState
  );

  return (
    <form action={formAction}>
      <div>
        <label htmlFor=""></label>
      </div>
    </form>
  );
}
