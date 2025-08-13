"use client";

import Image from "next/image";
import { Post } from "../page";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="border flex justify-between mb-4 rounded">
          <div className="flex flex-col justify-between p-4">
            <div>
              <p>{post.title}</p>
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
