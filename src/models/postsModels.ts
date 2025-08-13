import { PrismaClient } from "@/generated/prisma";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const addPost = async (
  id: string,
  title: string,
  content: string,
  image: File
) => {
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", folder: "next-blog" },
        async (error, result) => {
          if (error) {
            reject(new Error("Failed to upload image"));
            return;
          }
          if (!result) {
            reject(new Error("No result returned from Cloudinary upload"));
            return;
          }
          try {
            const post = await prisma.post.create({
              data: {
                authorId: id,
                title,
                content,
                image: result.secure_url,
              },
            });
            resolve(post);
          } catch (dbError) {
            reject(dbError);
          }
        }
      )
      .end(buffer);
  });
};

export const getPosts = async () => {
  return await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default prisma;
