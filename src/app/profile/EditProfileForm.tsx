"use client";

import { useState } from "react";
import {
  updateUserProfile,
  UserFormState,
} from "../controllers/usersControllers";
import Image from "next/image";
import PasswordModal from "../(components)/PasswordModal";

export default function EditProfileForm({
  user,
}: {
  user: {
    name: string;
    email: string;
    image: string | null;
    role: string;
    id: string;
    bio: string;
  };
}) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<UserFormState>({
    errors: {},
    name: "",
    email: "",
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
        const result = await updateUserProfile(user.id, formData);
        if (result && result.errors && Object.keys(result.errors).length > 0) {
          setFormState(result);
          if (result.errors.password) {
            setPasswordError(result.errors.password);
            return;
          }
          setShowPasswordModal(false);
          setPassword("");
        }
      } catch (error) {
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
        <h1 className="text-2xl font-bold">Edit Your Information</h1>
        <div className="flex flex-col">
          {user.image && (
            <Image
              src={user.image}
              priority={true}
              width={100}
              height={100}
              alt={user.name}
              className="rounded-full self-center"
            ></Image>
          )}

          <label htmlFor="image">Picture:</label>
          <input
            type="file"
            name="image"
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue={user.name}
          />
          {formState?.errors.name && (
            <p className="text-red-500">{formState.errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue={user.email}
          />
          {formState?.errors.email && (
            <p className="text-red-500">{formState.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            name="bio"
            id="bio"
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue={user.bio}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-2 py-1 rounded text-white ${
            isSubmitting
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Edits"}
        </button>
      </form>

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
    </>
  );
}
