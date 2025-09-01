import { Post } from "@/models/postModels";
import Link from "next/link";
import Image from "next/image";
import DisplayPostUserButtons from "./DisplayPostUserButtons";

export default function PostHeader({ post }: { post: Post }) {
  return (
    <div className="flex flex-col border-b">
      <Link href={`/post/${post.id}`} className="text-2xl font-bold max-w-fit">
        {post.title}
      </Link>
      <Link
        href={`/user/${post.author.id}`}
        className="max-w-fit flex items-center gap-2"
      >
        {post.author.image && (
          <Image
            src={post.author.image}
            width={50}
            height={50}
            alt={post.author.name}
            priority={true}
            className="rounded-full"
          />
        )}
        <p>{post.author.name}</p>
      </Link>
      <div className="flex items-center gap-2 mb-2 flex-col md:flex-row">
        <p>{post.createdAt.toDateString()}</p>
        <DisplayPostUserButtons post={post} />
      </div>
    </div>
  );
}
