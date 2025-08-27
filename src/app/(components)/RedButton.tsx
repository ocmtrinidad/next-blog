"use client";

import { useState } from "react";
import { removePost } from "../controllers/postsControllers";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default function RedButton({
  postId,
  userId,
}: {
  postId: string;
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
      const result = await removePost(postId, userId, password);
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
          className="w-10 h-6"
        >
          <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>

      {showPasswordModal && (
        <form
          onSubmit={handleFormSubmit}
          className="fixed inset-0 bg-[#333333] flex items-center justify-center z-50 text-black"
        >
          <div className="bg-white rounded-lg p-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold">Verify Your Identity</h2>
            <p>Please enter your password to confirm these changes.</p>

            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlePasswordConfirm();
                  }
                }}
                disabled={isSubmitting}
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={handleModalClose}
                disabled={isSubmitting}
                className="cursor-pointer px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePasswordConfirm}
                disabled={isSubmitting}
                className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isSubmitting ? "Verifying..." : "Confirm"}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
