"use server";

import {
  addUser,
  updateUser,
  getUserById,
  deleteUser,
  getUserByName,
  getUserByEmail,
} from "@/models/userModels";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

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
  password?: string;
};

export const createUser = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const [userTaken, emailTaken] = await Promise.all([
    getUserByName(name),
    getUserByEmail(email),
  ]);

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
  if (name.length > 25) {
    errors.name = "Name must not exceed 25 characters";
  }
  if (userTaken) {
    errors.name = "Name is already taken";
  }
  if (emailTaken) {
    errors.email = "Email is already taken";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, name, email };
  }

  await addUser(name, email, password);
  redirect("/");
};

export const updateUserProfile = async (id: string, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const bio = formData.get("bio") as string;
  const image = formData.get("image") as File | undefined;

  const [userTaken, emailTaken] = await Promise.all([
    getUserByName(name),
    getUserByEmail(email),
  ]);

  const errors: UserErrors = {};
  if (!name) {
    errors.name = "Name is required";
  }
  if (!email) {
    errors.email = "Email is required";
  }
  if (!password) {
    errors.password = "Password is required for verification";
  }
  if (name.length > 25) {
    errors.name = "Name must not exceed 25 characters";
  }
  if (userTaken) {
    errors.name = "Name is already taken";
  }
  if (emailTaken) {
    errors.email = "Email is already taken";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, name, email };
  }

  try {
    const currentUser = await getUserById(id);
    if (!currentUser) {
      return {
        errors: { password: "User not found" },
        name,
        email,
      };
    }

    const passwordMatch = await bcrypt.compare(password, currentUser.password);
    if (!passwordMatch) {
      return {
        errors: { password: "Incorrect password" },
        name,
        email,
      };
    }

    await updateUser(id, name, email, bio, image);

    revalidatePath("/profile");
    revalidatePath("/");
  } catch (error) {
    console.log("Error updating user profile:", error);
    return {
      errors: { name: "Failed to update profile. Please try again." },
      name,
      email,
    };
  }
};

export const removeUser = async (id: string, formData: FormData) => {
  const password = formData.get("password") as string;
  const errors: UserErrors = {};
  if (!password) {
    errors.password = "Password is required for verification";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    const currentUser = await getUserById(id);
    if (!currentUser) {
      return {
        errors: { password: "User not found" },
      };
    }

    const passwordMatch = await bcrypt.compare(password, currentUser.password);
    if (!passwordMatch) {
      return {
        errors: { password: "Incorrect password" },
      };
    }

    await deleteUser(id);
  } catch (error) {
    console.log("Error updating user profile:", error);
    return {
      errors: { name: "Failed to update profile. Please try again." },
    };
  }
};
