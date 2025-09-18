import BlueButton from "@/app/(components)/BlueButton";
import CommentsSection from "@/app/(components)/CommentsSection";
import PostHeader from "@/app/(components)/PostHeader";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getPost, Post } from "@/models/postModels";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PostId({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post: Post | null = await getPost(id);
  const session = await getServerSession(options);

  if (!post) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-2">
      <PostHeader post={post} route={`/user/${id}`} />
      <Image
        src={post.image}
        alt={post.title}
        width={400}
        height={400}
        priority={true}
        className="self-center"
      />
      <p className="border-y py-2">{post.content}</p>
      <Link href={`/category/${post.category.name}`} className="max-w-fit">
        <BlueButton>{post.category.name}</BlueButton>
      </Link>
      <CommentsSection post={post} user={session?.user} />
    </div>
  );
}
