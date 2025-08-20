import prisma from "../../lib/prisma";

export type Category = {
  id: string;
  name: string;
};

export const getCategories = async () => {
  return await prisma.category.findMany();
};
