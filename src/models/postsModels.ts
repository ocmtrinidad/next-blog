import prisma from "../../lib/prisma";
import { v2 as cloudinary } from "cloudinary";

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
  author: { id: string; name: string };
  createdAt: Date;
  category: { id: string; name: string };
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
          },
        },
        category: true,
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
        },
      },
      category: true,
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
        },
      },
      category: true,
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
          },
        },
        category: true,
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
        },
      },
      category: true,
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
          },
        },
        category: true,
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
        },
      },
      category: true,
    },
  });
};

export const deletePost = async (id: string) => {
  return await prisma.post.delete({
    where: { id },
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
