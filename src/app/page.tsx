import { getPosts } from "@/models/postsModels";
import PostList from "./(components)/PostList";

export type Post = {
  id: string;
  title: string;
  content: string;
  image: string;
  author: { name: string };
};

export default async function Home() {
  const posts: Post[] = await getPosts();

  return <PostList posts={posts} />;
}
