import { Post } from "@/models/postsModels";
import Link from "next/link";

export default function PostHeader({ post }: { post: Post }) {
  return (
    <div>
      <Link href={`/post/${post.id}`} className="text-2xl font-bold">
        {post.title}
      </Link>
      <p>By: {post.author.name}</p>
      <p>{post.createdAt.toDateString()}</p>
    </div>
  );
}
