import { Post } from "@/models/postsModels";
import Link from "next/link";

export default function PostHeader({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap">
      <Link href={`/post/${post.id}`} className="text-2xl font-bold">
        {post.title}
      </Link>
      <Link href={`/user/${post.author.id}`}>By: {post.author.name}</Link>
      <p>{post.createdAt.toDateString()}</p>
    </div>
  );
}
