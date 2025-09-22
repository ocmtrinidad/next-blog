"use client";

import { UserType } from "@/models/userModels";
import PasswordModal from "../(components)/PasswordModal";
import { useState } from "react";

export default function DeleteAccount({ user }: { user: UserType }) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        // const result = await updateUserProfile(user.id, formData);
        // if (result && result.errors && Object.keys(result.errors).length > 0) {
        //   if (result.errors.password) {
        //     setPasswordError(result.errors.password);
        //   } else {
        //     setShowPasswordModal(false);
        //     setPassword("");
        //   }
        // } else {
        //   setShowPasswordModal(false);
        //   setPassword("");
        // }
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
      <form onSubmit={handleFormSubmit} className="flex">
        <button className="flex-1 cursor-pointer bg-red-600 hover:bg-red-800 rounded mt-4 px-2 py-1">
          DELETE ACCOUNT
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
