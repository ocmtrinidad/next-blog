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
          <div className="flex flex-col p-2 flex-1 h-[250px]">
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
                <div className="flex gap-2">
                  <Link href={`/post/${post.id}/edit`}>
                    <BlueButton>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-10 h-6"
                      >
                        <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                    </BlueButton>
                  </Link>
                  <RedButton postId={post.id} />
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
