"use server";

import { addUser } from "@/models/usersModels";
import { redirect } from "next/navigation";

type UserErrors = {
  name?: string;
  email?: string;
  password?: string;
};

export type UserFormState = {
  errors: UserErrors;
};

export const createUser = async (prevState: FormData, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: UserErrors = {};
  if (!name) {
    errors.name = "Name is required";
  }

  if (!email) {
    errors.email = "Email is required";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await addUser(name, email, password);
  redirect("/");
};
