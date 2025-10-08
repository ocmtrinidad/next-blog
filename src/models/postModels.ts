import prisma from "../../lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { Like } from "./likeModels";
import { Comment } from "./commentModels";
import { UserType } from "./userModels";

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
  author: UserType;
  createdAt: Date;
  category: { id: string; name: string };
  Like: Like[];
  Comment: Comment[];
};

export const createPost = async (
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
        author: true,
        category: true,
        Like: true,
        Comment: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return await prisma.post.findMany({
    include: {
      author: true,
      category: true,
      Like: true,
      Comment: {
        include: {
          author: true,
        },
      },
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
      author: true,
      category: true,
      Like: true,
      Comment: {
        include: {
          author: true,
        },
      },
    },
  });
};

export const getPostsByAuthor = async (name: string, query?: string) => {
  if (query) {
    return await prisma.post.findMany({
      where: {
        AND: [
          { author: { name } },
          { title: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        author: true,
        category: true,
        Like: true,
        Comment: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return await prisma.post.findMany({
    where: { author: { name } },
    include: {
      author: true,
      category: true,
      Like: true,
      Comment: {
        include: {
          author: true,
        },
      },
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
        author: true,
        category: true,
        Like: true,
        Comment: {
          include: {
            author: true,
          },
        },
      },
    });
  }
  return await prisma.post.findMany({
    where: { category: { name: category } },
    include: {
      author: true,
      category: true,
      Like: true,
      Comment: {
        include: {
          author: true,
        },
      },
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
  return await prisma.$transaction([
    prisma.like.deleteMany({
      where: {
        postId: post.id,
      },
    }),
    prisma.comment.deleteMany({
      where: { postId: post.id },
    }),
    prisma.post.delete({
      where: { id: post.id },
    }),
  ]);
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

export const getLikedPosts = async (userId: string, query?: string) => {
  if (query) {
    return await prisma.post.findMany({
      where: {
        Like: {
          some: {
            userId: userId,
          },
        },
        title: { contains: query, mode: "insensitive" },
      },
      include: {
        author: true,
        category: true,
        Like: true,
        Comment: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return await prisma.post.findMany({
    where: {
      Like: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      author: true,
      category: true,
      Like: true,
      Comment: {
        include: {
          author: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default prisma;
