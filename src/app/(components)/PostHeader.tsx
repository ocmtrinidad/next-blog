import { Post } from "@/models/postModels";
import Link from "next/link";
import DisplayPostUserButtons from "./DisplayPostUserButtons";
import DisplayLikeButton from "./DisplayLikeButton";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import SmallProfilePicture from "./SmallProfilePicture";

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
        <SmallProfilePicture user={post.author} />
        <p>{post.author.name}</p>
      </Link>
      <div className="flex flex-col md:flex-row mb-2 items-start md:gap-2 md:items-center">
        <p>{post.createdAt.toDateString()}</p>
        <div className="flex items-center gap-2">
          <DisplayLikeButton user={session?.user} post={post} />
          <DisplayPostUserButtons post={post} />
        </div>
      </div>
    </div>
  );
}
