"use client";

import { useActionState } from "react";
import { createUser, UserFormState } from "../controllers/usersControllers";

export default function RegisterPage() {
  const initialState: UserFormState = {
    errors: {},
    name: "",
    email: "",
  };

  const [state, formAction, isPending] = useActionState(
    createUser,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Register Page</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          defaultValue={state.name}
        />
        {state?.errors.name && (
          <p className="text-red-500">{state.errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          defaultValue={state.email}
        />
        {state?.errors.email && (
          <p className="text-red-500">{state.errors.email}</p>
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
        {state?.errors.password && (
          <p className="text-red-500">{state.errors.password}</p>
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
        {state?.errors.confirmPassword && (
          <p className="text-red-500">{state.errors.confirmPassword}</p>
        )}
      </div>

      {isPending ? (
        <button className="bg-gray-500 px-4 py-2 rounded cursor-pointer">
          Submitting...
        </button>
      ) : (
        <button className="bg-blue-500 px-4 py-2 rounded cursor-pointer">
          Register
        </button>
      )}
    </form>
  );
}
