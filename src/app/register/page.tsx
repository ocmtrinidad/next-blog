"use client";

import { useState } from "react";
import { createUser, UserFormState } from "../controllers/usersControllers";
import BlueButton from "../(components)/BlueButton";
import Link from "next/link";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<UserFormState>({
    errors: {},
    name: "",
    email: "",
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData(new FormData(e.currentTarget));
    try {
      if (formData) {
        setIsSubmitting(true);
        const result = await createUser(formData);
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
    <>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mb-4">
        <h2 className="text-xl font-bold">Register Page</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue={formState.name}
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
            defaultValue={formState.email}
          />
          {formState?.errors.email && (
            <p className="text-red-500">{formState.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {formState?.errors.password && (
            <p className="text-red-500">{formState.errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Your Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {formState?.errors.confirmPassword && (
            <p className="text-red-500">{formState.errors.confirmPassword}</p>
          )}
        </div>

        {isSubmitting ? (
          <button className="bg-gray-500 px-2 py-1 rounded cursor-pointer">
            Submitting...
          </button>
        ) : (
          <button className="bg-blue-500 px-2 py-1 rounded cursor-pointer">
            Register
          </button>
        )}
      </form>
      <p>Already Have An Account?</p>
      <div className="flex gap-2 mt-4">
        <Link href={"/api/auth/signin?callbackUrl=/"}>
          <BlueButton>Login Here</BlueButton>
        </Link>
      </div>
    </>
  );
}
