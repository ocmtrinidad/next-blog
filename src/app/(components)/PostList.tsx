"use client";

import { Post } from "@/models/postsModels";
import Image from "next/image";
import Link from "next/link";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="border flex justify-between mb-4 rounded">
          <div className="flex flex-col justify-between p-4">
            <div>
              <Link href={`/post/${post.id}`} className="text-xl font-bold">
                {post.title}
              </Link>
              <p>{post.content}</p>
            </div>
            <p>By: {post.author.name}</p>
          </div>
          <Image
            src={post.image}
            alt={post.title}
            width={250}
            height={250}
            priority={true}
          />
        </div>
      ))}
    </>
  );
}
