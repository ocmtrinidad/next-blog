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

  // Does not reload the page when a new post is added. Use client side.
  return <PostList posts={posts} />;
}
