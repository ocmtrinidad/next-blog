import { Post } from "@/models/postModels";
import Link from "next/link";
import Image from "next/image";
import DisplayPostUserButtons from "./DisplayPostUserButtons";
import DisplayLikeButton from "./DisplayLikeButton";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function PostHeader({ post }: { post: Post }) {
  const session = await getServerSession(options);

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
        <DisplayLikeButton user={session?.user} post={post} />
        <DisplayPostUserButtons post={post} />
      </div>
    </div>
  );
}
