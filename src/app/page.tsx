import { getPosts } from "@/models/postsModels";
import Image from "next/image";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="border flex justify-between">
          <div className="p-4 mb-4">
            <p>{post.title}</p>
            <p>{post.content}</p>
          </div>
          <Image
            src={post.image}
            alt={post.title}
            width={250}
            height={250}
            priority={true}
          />
        </div>
      ))}
    </>
  );
}
