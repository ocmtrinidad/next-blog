import { Post } from "@/models/postsModels";
import Image from "next/image";
import PostHeader from "./PostHeader";
import Link from "next/link";
import BlueButton from "./BlueButton";
import RedButton from "./RedButton";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function PostList({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return <p className="text-center">No posts available</p>;
  }

  const session = await getServerSession(options);

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="border flex justify-between mb-4 rounded">
          <div className="flex flex-col p-4 flex-1 h-[250px]">
            <PostHeader post={post} />
            <Link
              href={`/post/${post.id}`}
              className="overflow-hidden mt-2 flex-1"
            >
              <p>{post.content}</p>
            </Link>
            <div className="flex justify-between">
              <Link
                href={`/category/${post.category.name}`}
                className="max-w-fit"
              >
                <BlueButton>{post.category.name}</BlueButton>
              </Link>
              {session?.user.id === post.author.id && (
                <div className="flex gap-2 mb-2">
                  <Link href={`/post/${post.id}/edit`}>
                    <BlueButton>Edit</BlueButton>
                  </Link>
                  <RedButton postId={post.id}>DELETE</RedButton>
                </div>
              )}
            </div>
          </div>
          <Link href={`/post/${post.id}`}>
            <Image
              src={post.image}
              alt={post.title}
              width={250}
              height={250}
              priority={true}
            />
          </Link>
        </div>
      ))}
    </>
  );
}
