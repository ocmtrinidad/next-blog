import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export type UserType = {
  id: string;
  name: string;
  email: string;
  image?: string;
  role?: string;
};

export const addUser = async (
  name: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    return user;
  }
  return null;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (user) {
    return user;
  }
  return null;
};

export const updateUser = async (id: string, name: string, email: string) => {
  return await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
    },
  });
};

export default prisma;
