import prisma from "../../lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { Like } from "./likeModels";
import { Comment } from "./commentModels";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type Post = {
  id: string;
  title: string;
  content: string;
  image: string;
  author: { id: string; name: string; image: string | null };
  createdAt: Date;
  category: { id: string; name: string };
  Like: Like[];
  Comment: Comment[];
};

export const addPost = async (
  id: string,
  title: string,
  content: string,
  image: File,
  category: string
) => {
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          folder: "next-blog/post",
          public_id: `${title}_${id}`,
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
            console.log("Cloudinary upload result:", result.public_id);
            const post = await prisma.post.create({
              data: {
                authorId: id,
                title,
                content,
                image: result.secure_url,
                categoryId: category,
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

export const getPosts = async (query?: string) => {
  if (query) {
    return await prisma.post.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        category: true,
        Like: true,
        Comment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      category: true,
      Like: true,
      Comment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPost = async (id: string) => {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      category: true,
      Like: true,
      Comment: true,
    },
  });
};

export const getPostsByAuthor = async (id: string, query?: string) => {
  if (query) {
    return await prisma.post.findMany({
      where: {
        AND: [
          { authorId: id },
          { title: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        category: true,
        Like: true,
        Comment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return await prisma.post.findMany({
    where: { authorId: id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      category: true,
      Like: true,
      Comment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPostsByCategory = async (category: string, query?: string) => {
  if (query) {
    return await prisma.post.findMany({
      where: {
        category: { name: category },
        title: { contains: query, mode: "insensitive" },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        category: true,
        Like: true,
        Comment: true,
      },
    });
  }
  return await prisma.post.findMany({
    where: { category: { name: category } },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      category: true,
      Like: true,
      Comment: true,
    },
  });
};

export const deletePost = async (post: Post) => {
  cloudinary.uploader.destroy(
    `next-blog/post/${post.title}_${post.author.id}`,
    (error, result) => {
      if (error) {
        console.log("Error deleting image from Cloudinary:", error);
        return;
      } else {
        console.log("Cloudinary deletion result:", result);
      }
    }
  );
  return await prisma.post.delete({
    where: { id: post.id },
  });
};

export const updatePost = async (
  postId: string,
  title: string,
  content: string,
  category: string
) => {
  return await prisma.post.update({
    where: { id: postId },
    data: {
      title,
      content,
      categoryId: category,
    },
  });
};

export default prisma;
