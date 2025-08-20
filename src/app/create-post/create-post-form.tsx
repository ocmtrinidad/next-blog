"use client";

import { useActionState } from "react";
import { PostFormState, createPost } from "../controllers/postsControllers";
import { UserType } from "@/models/usersModels";
import { Category } from "@/models/categoryModels";
import BlueButton from "../(components)/BlueButton";

export default function CreatePostForm({
  user,
  categories,
}: {
  user: UserType;
  categories: Category[];
}) {
  const initialState: PostFormState = {
    errors: {},
    title: "",
    content: "",
    category: "",
  };

  const [state, formAction, isPending] = useActionState(
    createPost.bind(null, user.id),
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
          defaultValue={state?.title}
          className="border rounded p-2 w-full"
        />
        {state?.errors.title && (
          <p className="text-red-500">{state.errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          id="content"
          defaultValue={state?.content}
          className="border rounded p-2 w-full"
        ></textarea>
        {state?.errors.content && (
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
        {state?.errors.image && (
          <p className="text-red-500">{state.errors.image}</p>
        )}
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select
          name="category"
          id="category"
          className="border rounded p-2 w-full"
        >
          <option value="" className="text-black">
            --Select A Category--
          </option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className="text-black"
            >
              {category.name}
            </option>
          ))}
        </select>
        {state?.errors.category && (
          <p className="text-red-500">{state.errors.category}</p>
        )}
      </div>

      {isPending ? (
        <button className="bg-gray-500 px-4 py-2 rounded cursor-pointer">
          Publishing...
        </button>
      ) : (
        <BlueButton>Publish</BlueButton>
      )}
    </form>
  );
}
