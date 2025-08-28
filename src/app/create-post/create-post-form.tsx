"use client";

import { useState } from "react";
import { PostFormState, createPost } from "../controllers/postsControllers";
import { UserType } from "@/models/usersModels";
import { Category } from "@/models/categoryModels";
import BlueButton from "../(components)/BlueButton";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import PasswordModal from "../(components)/PasswordModal";

export default function CreatePostForm({
  user,
  categories,
}: {
  user: UserType;
  categories: Category[];
}) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<PostFormState>({
    errors: {},
    title: "",
    content: "",
    category: "",
    password: "",
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData(new FormData(e.currentTarget));
    setShowPasswordModal(true);
    setPassword("");
    setPasswordError("");
  };

  const handlePasswordConfirm = async () => {
    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    }

    if (formData) {
      setIsSubmitting(true);
      if (!formData.has("password")) {
        formData.append("password", password);
      } else {
        formData.set("password", password);
      }

      try {
        const result = await createPost(user.id, undefined, formData);
        if (result && result.errors && Object.keys(result.errors).length > 0) {
          setFormState(result);
          if (result.errors.password) {
            setPasswordError(result.errors.password);
          } else {
            setShowPasswordModal(false);
            setPassword("");
          }
        } else {
          setShowPasswordModal(false);
          setPassword("");
        }
      } catch (error) {
        if (isRedirectError(error)) {
          return;
        }
        console.log("Error submitting form:", error);
        setPasswordError("An error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleModalClose = () => {
    setShowPasswordModal(false);
    setPassword("");
    setPasswordError("");
    setFormData(null);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Create A Post</h2>
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
          <button className="bg-gray-500 px-4 py-2 rounded cursor-pointer">
            Publishing...
          </button>
        ) : (
          <BlueButton>Publish</BlueButton>
        )}

        {showPasswordModal && (
          <PasswordModal
            password={password}
            setPassword={setPassword}
            passwordError={passwordError}
            isSubmitting={isSubmitting}
            handlePasswordConfirm={handlePasswordConfirm}
            handleModalClose={handleModalClose}
          />
        )}
      </form>
    </>
  );
}
