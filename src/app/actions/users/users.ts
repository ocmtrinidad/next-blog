"use server";

import { addUser } from "@/prisma-db";
import { redirect } from "next/navigation";

export type Errors = {
  name?: string;
  email?: string;
  password?: string;
};

export type FormState = {
  errors: Errors;
};

export const createUser = async (prevState: FormData, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: Errors = {};
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
