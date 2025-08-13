"use server";

import { addUser } from "@/models/usersModels";
import { redirect } from "next/navigation";

type UserErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type UserFormState = {
  errors: UserErrors;
  name: string;
  email: string;
};

export const createUser = async (prevState: FormData, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

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

  if (password !== confirmPassword && password.length && confirmPassword) {
    errors.confirmPassword = "Confirm Password must match your password";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, name, email };
  }

  await addUser(name, email, password);
  redirect("/");
};
