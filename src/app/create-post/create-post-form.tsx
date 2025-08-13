"use client";

import { useActionState } from "react";
import { PostFormState, createPost } from "../controllers/postsControllers";
import { UserType } from "@/models/usersModels";

export default function CreatePostForm({ user }: { user: UserType }) {
  const initialState: PostFormState = {
    errors: {},
    title: "",
    content: "",
  };

  const createPostWithId = createPost.bind(null, user.id);

  const [state, formAction, isPending] = useActionState(
    createPostWithId,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Create A Post</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={state.title}
          className="border rounded p-2 w-full"
        />
        {state.errors.title && (
          <p className="text-red-500">{state.errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          id="content"
          defaultValue={state.content}
          className="border rounded p-2 w-full"
        ></textarea>
        {state.errors.content && (
          <p className="text-red-500">{state.errors.content}</p>
        )}
      </div>

      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          name="image"
          id="image"
          className="border rounded p-2 w-full"
        />
        {state.errors.image && (
          <p className="text-red-500">{state.errors.image}</p>
        )}
      </div>

      {isPending ? (
        <button className="bg-gray-500 px-4 py-2 rounded cursor-pointer">
          Publishing...
        </button>
      ) : (
        <button className="bg-blue-500 px-4 py-2 rounded cursor-pointer">
          Publish
        </button>
      )}
    </form>
  );
}
