import { Post } from "@/models/postModels";
import Image from "next/image";
import PostHeader from "./PostHeader";
import Link from "next/link";
import BlueButton from "./BlueButton";

export default function PostList({
  posts,
  route,
}: {
  posts: Post[];
  route: string;
}) {
  if (!posts.length) {
    return <p className="text-center">No posts available</p>;
  }

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="border flex flex-col mb-4 rounded sm:flex-row"
        >
          <Link href={`/post/${post.id}`} className="self-center">
            <Image
              src={post.image}
              alt={post.title}
              width={250}
              height={250}
              priority={true}
            />
          </Link>
          <div className="flex flex-col p-2 flex-1 h-[250px] border-t sm:border-t-0 sm:border-l">
            <PostHeader post={post} route={route} />
            <Link href={`/post/${post.id}`} className="overflow-hidden flex-1">
              <p>{post.content}</p>
            </Link>
            <div className="flex justify-between">
              <Link
                href={`/category/${post.category.name}`}
                className="max-w-fit"
              >
                <BlueButton>{post.category.name}</BlueButton>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
