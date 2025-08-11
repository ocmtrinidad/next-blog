"use client";

import { useActionState } from "react";
import { createUser, UserFormState } from "../controllers/usersControllers";

export default function RegisterPage() {
  const initialState: UserFormState = {
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(
    createUser,
    initialState
  );

  return (
    <>
      <h2>Register Page</h2>
      <form action={formAction}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" />
          {state?.errors.name && (
            <p className="text-red-500">{state.errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="username">Email:</label>
          <input type="email" name="email" id="email" />
          {state?.errors.email && (
            <p className="text-red-500">{state.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" />
          {state?.errors.password && (
            <p className="text-red-500">{state.errors.password}</p>
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
    </>
  );
}
