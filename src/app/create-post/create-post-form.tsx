"use client";

import { useState } from "react";
import { PostFormState, submitPost } from "../controllers/postsControllers";
import { UserType } from "@/models/userModels";
import { Category } from "@/models/categoryModels";
import BlueButton from "../(components)/BlueButton";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default function CreatePostForm({
  user,
  categories,
}: {
  user: UserType;
  categories: Category[];
}) {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<PostFormState>({
    errors: {},
    title: "",
    content: "",
    category: "",
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData(new FormData(e.currentTarget));
    try {
      if (formData) {
        setIsSubmitting(true);
        const result = await submitPost(user.id, undefined, formData);
        if (result && result.errors && Object.keys(result.errors).length > 0) {
          setFormState(result);
        }
      }
    } catch (error) {
      if (isRedirectError(error)) {
        return;
      }
      console.log("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Create Post</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={formState?.title}
          className="border rounded p-2 w-full"
        />
        {formState?.errors.title && (
          <p className="text-red-500">{formState.errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          id="content"
          defaultValue={formState?.content}
          className="border rounded p-2 w-full"
        ></textarea>
        {formState?.errors.content && (
          <p className="text-red-500">{formState.errors.content}</p>
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
        {formState?.errors.image && (
          <p className="text-red-500">{formState.errors.image}</p>
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
        {formState?.errors.category && (
          <p className="text-red-500">{formState.errors.category}</p>
        )}
      </div>

      {isSubmitting ? (
        <button className="bg-gray-500 px-2 py-1 rounded cursor-pointer">
          Publishing...
        </button>
      ) : (
        <BlueButton>Publish</BlueButton>
      )}
    </form>
  );
}
