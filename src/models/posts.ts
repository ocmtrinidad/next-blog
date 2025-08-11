import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const addPost = async (
  id: string,
  title: string,
  content: string,
  image: string
) => {
  return await prisma.post.create({
    data: {
      authorId: id,
      title,
      content,
      image,
    },
  });
};

export default prisma;
