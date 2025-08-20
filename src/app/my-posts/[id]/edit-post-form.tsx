"use client";

import { useActionState } from "react";
import { PostFormState, editPost } from "@/app/controllers/postsControllers";
import BlueButton from "@/app/(components)/BlueButton";
import { Post } from "@/models/postsModels";
import { Category } from "@/models/categoryModels";
import Image from "next/image";

export default function EditPostForm({
  post,
  categories,
}: {
  post: Post;
  categories: Category[];
}) {
  const initialState: PostFormState = {
    errors: {},
    title: "",
    content: "",
  };

  const [state, formAction, isPending] = useActionState(
    editPost.bind(null, post.id),
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Edit Post Page</h2>
      <Image
        src={post.image}
        alt={post.title}
        width={400}
        height={400}
        priority={true}
        className="self-center"
      />
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={state?.title || post.title}
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
          defaultValue={state?.content || post.content}
          className="border rounded p-2 w-full"
        ></textarea>
        {state?.errors.content && (
          <p className="text-red-500">{state.errors.content}</p>
        )}
      </div>

      <div>
        <label htmlFor="category">Category:</label>
        <select
          name="category"
          id="category"
          className="border rounded p-2 w-full"
          defaultValue={state?.category || post.category.id}
        >
          <option value="" className="text-black" disabled>
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
