import { Post } from "@/models/postModels";
import Image from "next/image";
import PostHeader from "./PostHeader";
import Link from "next/link";
import BlueButton from "./BlueButton";

export default function PostList({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return <p className="text-center">No posts available</p>;
  }

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="border flex mb-4 rounded">
          <div className="flex flex-col p-2 flex-1 h-[250px]">
            <PostHeader post={post} />
            <Link
              href={`/post/${post.id}`}
              className="overflow-hidden mt-2 flex-1 mb-2"
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
