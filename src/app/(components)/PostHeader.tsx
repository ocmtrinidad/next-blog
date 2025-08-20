import { Post } from "@/models/postsModels";
import Link from "next/link";
import RedButton from "./RedButton";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import BlueButton from "./BlueButton";

export default async function PostHeader({ post }: { post: Post }) {
  const session = await getServerSession(options);

  return (
    <div className="flex flex-col border-b">
      {session?.user.id === post.author.id && (
        <div className="flex gap-2 mb-2">
          <Link href={`/my-posts/${post.id}`}>
            <BlueButton>Edit</BlueButton>
          </Link>
          <RedButton postId={post.id}>DELETE</RedButton>
        </div>
      )}
      <Link href={`/post/${post.id}`} className="text-2xl font-bold max-w-fit">
        {post.title}
      </Link>
      <Link href={`/user/${post.author.id}`} className="max-w-fit">
        By: {post.author.name}
      </Link>
      <p>{post.createdAt.toDateString()}</p>
    </div>
  );
}
