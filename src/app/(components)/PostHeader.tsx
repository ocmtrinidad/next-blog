import { Post } from "@/models/postsModels";
import Link from "next/link";
import Image from "next/image";

export default async function PostHeader({ post }: { post: Post }) {
  return (
    <div className="flex flex-col border-b">
      <Link href={`/post/${post.id}`} className="text-2xl font-bold max-w-fit">
        {post.title}
      </Link>
      <Link
        href={`/user/${post.author.id}`}
        className="max-w-fit flex items-center gap-2"
      >
        <Image
          src={post.author.image}
          width={50}
          height={50}
          alt={post.author.name}
          priority={true}
          className="rounded-full"
        />
        <p>{post.author.name}</p>
      </Link>
      <p>{post.createdAt.toDateString()}</p>
    </div>
  );
}
