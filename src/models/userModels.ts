import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type UserType = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
  bio?: string | null;
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

export const updateUser = async (
  id: string,
  name: string,
  email: string,
  bio: string,
  image: File | undefined
) => {
  if (image && image.size > 0) {
    const arrayBuffer = await image?.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        `next-blog/profile-picture/profile_${id}`,
        (error, result) => {
          if (error) {
            console.log("Error deleting image from Cloudinary:", error);
            return;
          } else {
            console.log("Cloudinary deletion result:", result);
          }
        }
      );
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "next-blog/profile-picture",
            public_id: `profile_${id}`,
            transformation: {
              height: 100,
              width: 100,
              crop: "thumb",
              radius: "max",
            },
          },
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
              const user = await prisma.user.update({
                where: { id },
                data: {
                  name,
                  email,
                  bio,
                  image: result.secure_url,
                },
              });
              resolve(user);
            } catch (dbError) {
              reject(dbError);
            }
          }
        )
        .end(buffer);
    });
  }

  return await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      bio,
    },
  });
};

export default prisma;
