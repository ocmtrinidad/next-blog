"use client";

import { useState } from "react";
import { removePost } from "../controllers/postsControllers";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import PasswordModal from "./PasswordModal";
import { Post } from "@/models/postsModels";

export default function RedButton({
  post,
  userId,
}: {
  post: Post;
  userId: string;
}) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowPasswordModal(true);
    setPassword("");
    setPasswordError("");
  };

  const handlePasswordConfirm = async () => {
    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await removePost(post, userId, password);
      if (result && result.errors && Object.keys(result.errors).length > 0) {
        if (result.errors.password) {
          setPasswordError(result.errors.password);
        }
      }
      setShowPasswordModal(false);
      setPassword("");
      setPasswordError("");
    } catch (error) {
      if (isRedirectError(error)) {
        return;
      }
      console.log("Error submitting form:", error);
      setPasswordError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowPasswordModal(false);
    setPassword("");
    setPasswordError("");
  };

  return (
    <>
      <button
        className="cursor-pointer bg-red-600 hover:bg-red-800 rounded"
        onClick={() => setShowPasswordModal(true)}
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

      {showPasswordModal && (
        <form onSubmit={handleFormSubmit}>
          <PasswordModal
            password={password}
            setPassword={setPassword}
            passwordError={passwordError}
            isSubmitting={isSubmitting}
            handlePasswordConfirm={handlePasswordConfirm}
            handleModalClose={handleModalClose}
          />
        </form>
      )}
    </>
  );
}
