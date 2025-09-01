import PostHeader from "@/app/(components)/PostHeader";
import { getPost, Post } from "@/models/postModels";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function PostId({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post: Post | null = await getPost(id);

  if (!post) {
    redirect("/");
  }

  return (
    <div className="flex flex-col p-4 gap-4 border rounded">
      <PostHeader post={post} />
      <Image
        src={post.image}
        alt={post.title}
        width={400}
        height={400}
        priority={true}
        className="self-center"
      />
      <p>{post.content}</p>
    </div>
  );
}
