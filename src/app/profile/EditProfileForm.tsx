"use client";

import { useActionState } from "react";
import {
  updateUserProfile,
  UserFormState,
} from "../controllers/usersControllers";

export default function EditProfileForm({
  user,
}: {
  user: {
    name: string;
    email: string;
    image: string | null;
    role: string;
    id: string;
  };
}) {
  const initialState: UserFormState = {
    errors: {},
    name: "",
    email: "",
  };

  const [state, formAction, isPending] = useActionState(
    updateUserProfile.bind(null, user.id),
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          className="border rounded p-2 w-full"
          defaultValue={user.name}
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
          className="border rounded p-2 w-full"
          defaultValue={user.email}
        />
        {state?.errors.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
      </div>

      {isPending ? (
        <button className="bg-gray-500 px-4 py-2 rounded cursor-pointer">
          Submitting...
        </button>
      ) : (
        <button className="bg-blue-500 px-4 py-2 rounded cursor-pointer">
          Submit Edits
        </button>
      )}
    </form>
  );
}
