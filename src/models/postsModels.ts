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
  cloudinary.uploader
    .upload_stream(
      { resource_type: "image", folder: "next-blog" },
      async (error, result) => {
        if (error) {
          throw new Error("Failed to upload image");
        }
        if (!result) {
          throw new Error("No result returned from Cloudinary upload");
        }
        return await prisma.post.create({
          data: {
            authorId: id,
            title,
            content,
            image: result.secure_url,
          },
        });
      }
    )
    .end(buffer);
};

export default prisma;
